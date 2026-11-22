import subprocess
import time
import json
import urllib.request
import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DIST_HTML = os.path.join(PROJECT_DIR, "dist", "oxford5000-flashcards-final.html")

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

print(f"Using browser: {edge_path}")
file_url = "file:///" + DIST_HTML.replace("\\", "/") + "#selftest"
print(f"Opening: {file_url}")

proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    "--disable-gpu",
    "--remote-debugging-port=9333",
    "--user-data-dir=" + os.path.join(PROJECT_DIR, ".tmp_browser_profile"),
    file_url
])

time.sleep(3)
try:
    with urllib.request.urlopen("http://127.0.0.1:9333/json", timeout=5) as resp:
        tabs = json.loads(resp.read().decode())
    print("Found tabs:", len(tabs))
    target_tab = None
    for tab in tabs:
        if "oxford5000" in tab.get("url", ""):
            target_tab = tab
            break
    if not target_tab and tabs:
        target_tab = tabs[0]
    
    if not target_tab:
        print("No target tab found!")
        sys.exit(1)
        
    ws_url = target_tab.get("webSocketDebuggerUrl")
    print(f"Target tab: {target_tab.get('title')} ({ws_url})")
    
    # Run node checker
    checker_code = f"""
    const ws = new WebSocket('{ws_url}');
    let passed = false;
    let errors = [];
    ws.onopen = () => {{
        ws.send(JSON.stringify({{ id: 1, method: 'Runtime.enable' }}));
        ws.send(JSON.stringify({{ id: 2, method: 'Log.enable' }}));
    }};
    ws.onmessage = (evt) => {{
        const msg = JSON.parse(evt.data);
        if (msg.method === 'Runtime.consoleAPICalled') {{
            const type = msg.params.type;
            const text = msg.params.args.map(a => a.value || JSON.stringify(a)).join(' ');
            console.log(`[BROWSER ${{type}}]: ${{text}}`);
            if (text.includes('SELFTEST PASS')) {{
                passed = true;
                setTimeout(() => {{
                    ws.close();
                    process.exit(errors.length > 0 ? 1 : 0);
                }}, 500);
            }}
            if (type === 'error' || text.includes('Assertion failed')) {{
                errors.push(text);
            }}
        }} else if (msg.method === 'Runtime.exceptionThrown') {{
            console.error('[BROWSER EXCEPTION]:', JSON.stringify(msg.params));
            errors.push(JSON.stringify(msg.params));
        }}
    }};
    setTimeout(() => {{
        if (!passed) {{
            console.error('TIMEOUT: SELFTEST PASS was not received');
            process.exit(1);
        }}
    }}, 12000);
    """
    res = subprocess.run(["node", "-e", checker_code], capture_output=True, text=True, timeout=15)
    print("CHECKER STDOUT:")
    print(res.stdout)
    if res.stderr:
        print("CHECKER STDERR:")
        print(res.stderr)
    if res.returncode == 0:
        print("===> SUCCESS: SELFTEST PASSED! <===")
    else:
        print(f"===> FAILED with code {res.returncode} <===")
        sys.exit(1)
finally:
    proc.terminate()
    try:
        proc.wait(timeout=3)
    except Exception:
        proc.kill()
