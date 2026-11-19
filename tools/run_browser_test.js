const http = require('http');

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  const tabs = await getJson('http://127.0.0.1:9222/json');
  const appTab = tabs.find(t => t.url && t.url.includes('oxford5000'));
  if (!appTab) {
    console.error('App tab not found! Available tabs:', tabs.map(t => t.url));
    process.exit(1);
  }

  const ws = new WebSocket(appTab.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onopen = async () => {
    await send('Runtime.enable');

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const theWord = document.getElementById('theWord');
        const audioGroup = document.getElementById('wordAudioGroup');
        const btnUk = document.getElementById('btnAudioUk');
        const btnUs = document.getElementById('btnAudioUs');
        const speakSentence = document.getElementById('speakSentence');
        const speakMain = document.getElementById('speakMain');

        const card = document.getElementById('card');
        const cardRect = card ? card.getBoundingClientRect() : null;
        const wordRect = theWord ? theWord.getBoundingClientRect() : null;
        const audioRect = audioGroup ? audioGroup.getBoundingClientRect() : null;

        // Check vertical order: theWord should be ABOVE wordAudioGroup
        const wordAboveAudio = (wordRect && audioRect) ? (wordRect.bottom <= audioRect.top + 2) : false;

        // Check horizontal alignment: centers should be close to card center
        const cardCenter = cardRect ? (cardRect.left + cardRect.right) / 2 : 0;
        const wordCenter = wordRect ? (wordRect.left + wordRect.right) / 2 : 0;
        const audioCenter = audioRect ? (audioRect.left + audioRect.right) / 2 : 0;

        return {
          theWordText: theWord ? theWord.innerText.trim() : null,
          hasAudioUk: !!btnUk,
          hasAudioUs: !!btnUs,
          hasSpeakSentence: !!speakSentence, // Should be false!
          wordAboveAudio,
          cardCenter,
          wordCenter,
          audioCenter,
          wordCenterDiff: Math.abs(cardCenter - wordCenter),
          audioCenterDiff: Math.abs(cardCenter - audioCenter),
          btnUkAria: btnUk ? btnUk.getAttribute('aria-label') : null,
          btnUsAria: btnUs ? btnUs.getAttribute('aria-label') : null
        };
      })()`,
      returnByValue: true
    });

    console.log(JSON.stringify(evalRes, null, 2));
    ws.close();
    process.exit(0);
  };

  ws.onmessage = evt => {
    const msg = JSON.parse(evt.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id).resolve(msg);
      pending.delete(msg.id);
    }
  };

  ws.onerror = err => {
    console.error('WS Error:', err);
    process.exit(1);
  };
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
