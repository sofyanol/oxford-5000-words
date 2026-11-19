import subprocess
import time
import sys
import os

ROOT = r"e:\File Home\07-Ai Files\Coding folder\oxford 5000\oxford5000-app"

# 1. Start server
server = subprocess.Popen([sys.executable, "-m", "http.server", "8765"], cwd=ROOT)
print("HTTP server started on port 8765")
time.sleep(1.5)

# 2. Start Edge headless
edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
edge_proc = subprocess.Popen([
    edge,
    "--headless",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "http://127.0.0.1:8765/dist/oxford5000-flashcards-final.html#selftest"
])
print("Edge headless started on port 9222")
time.sleep(2.5)

try:
    # 3. Run node runner
    res = subprocess.run(["node", os.path.join(ROOT, "tools", "run_browser_test.js")], capture_output=True, text=True, timeout=20)
    print("STDOUT:")
    print(res.stdout)
    if res.stderr:
        print("STDERR:")
        print(res.stderr)
finally:
    edge_proc.terminate()
    server.terminate()
    print("Cleaned up processes.")
