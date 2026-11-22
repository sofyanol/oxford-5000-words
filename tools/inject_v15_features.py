import os
import re

app_js_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "app.js")
if not os.path.exists(app_js_path):
    app_js_path = os.path.join(os.getcwd(), "src", "app.js")
if not os.path.exists(app_js_path):
    app_js_path = os.path.join(os.getcwd(), "oxford5000-app 1.5 coding", "src", "app.js")

with open(app_js_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the v1.5 block with robust, scoped implementation
pattern = r"/\* ========================================================\s+OXFORD 5000 v1\.5 FEATURE ENHANCEMENT ENGINE[\s\S]*?function wireV15ToolbarAndModals\(\)\{[\s\S]*?\n\}"

clean_v15_code = r"""/* ========================================================
   OXFORD 5000 v1.5 FEATURE ENHANCEMENT ENGINE
   - Theme Switcher (Midnight / OLED / Sepia)
   - Procedural Web Audio Ambient Focus Soundscapes
   - Hands-Free Auto-Play Walk & Sleep Mode
   - Gamification Badges & Milestone Achievements (10 Badges)
   - Smart Focus Deck / Leech Hunter
   - Printable Study Sheets & Cut-out Flashcards PDF
   ======================================================== */

// --- 1. THEME SWITCHER ---
function applyTheme(theme){
  const validThemes = ['midnight', 'oled', 'sepia'];
  const t = validThemes.includes(theme) ? theme : 'midnight';
  document.documentElement.setAttribute('data-theme', t);
  try {
    localStorage.setItem('oxford_theme', t);
  } catch(_){}
  const sel = document.getElementById('settingsTheme');
  if(sel && sel.value !== t) sel.value = t;
}

function initTheme(){
  let saved = 'midnight';
  try {
    saved = localStorage.getItem('oxford_theme') || 'midnight';
  } catch(_){}
  applyTheme(saved);
  const sel = document.getElementById('settingsTheme');
  if(sel){
    sel.value = saved;
    sel.addEventListener('change', (e) => applyTheme(e.target.value));
  }
}

// --- 2. AMBIENT FOCUS SOUNDSCAPES (PURE WEB AUDIO API) ---
let ambientAudioCtx = null;
let ambientMasterGain = null;
let ambientTracks = {
  rain: { playing: false, gain: null, source: null, filter: null, vol: 0.5 },
  fire: { playing: false, gain: null, timer: null, source: null, vol: 0.5 },
  waves: { playing: false, gain: null, source: null, lfo: null, filter: null, vol: 0.5 }
};
let ambientMuted = false;

function getAmbientAudioCtx(){
  if(!ambientAudioCtx){
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if(AudioContextClass){
      ambientAudioCtx = new AudioContextClass();
      ambientMasterGain = ambientAudioCtx.createGain();
      ambientMasterGain.gain.setValueAtTime(0.7, ambientAudioCtx.currentTime);
      ambientMasterGain.connect(ambientAudioCtx.destination);
    }
  }
  if(ambientAudioCtx && ambientAudioCtx.state === 'suspended'){
    ambientAudioCtx.resume().catch(() => {});
  }
  return ambientAudioCtx;
}

function createNoiseBuffer(durationSec, type){
  const ctx = getAmbientAudioCtx();
  if(!ctx) return null;
  const bufferSize = ctx.sampleRate * durationSec;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for(let i = 0; i < bufferSize; i++){
    const white = Math.random() * 2 - 1;
    if(type === 'pink'){
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
    } else {
      data[i] = white * 0.25;
    }
  }
  return buffer;
}

function startRain(){
  const ctx = getAmbientAudioCtx();
  if(!ctx) return;
  const track = ambientTracks.rain;
  if(track.playing) return;
  const noiseBuf = createNoiseBuffer(3, 'pink');
  track.source = ctx.createBufferSource();
  track.source.buffer = noiseBuf;
  track.source.loop = true;
  track.filter = ctx.createBiquadFilter();
  track.filter.type = 'lowpass';
  track.filter.frequency.setValueAtTime(950, ctx.currentTime);
  track.gain = ctx.createGain();
  track.gain.gain.setValueAtTime(track.vol * 0.8, ctx.currentTime);
  track.source.connect(track.filter);
  track.filter.connect(track.gain);
  track.gain.connect(ambientMasterGain);
  track.source.start();
  track.playing = true;
}

function stopRain(){
  const track = ambientTracks.rain;
  if(!track.playing) return;
  try {
    track.source.stop();
    track.source.disconnect();
  } catch(_){}
  track.playing = false;
}

function startFire(){
  const ctx = getAmbientAudioCtx();
  if(!ctx) return;
  const track = ambientTracks.fire;
  if(track.playing) return;
  track.gain = ctx.createGain();
  track.gain.gain.setValueAtTime(track.vol * 0.7, ctx.currentTime);
  track.gain.connect(ambientMasterGain);

  const rumbleBuf = createNoiseBuffer(2, 'pink');
  const rumble = ctx.createBufferSource();
  rumble.buffer = rumbleBuf;
  rumble.loop = true;
  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = 'lowpass';
  rumbleFilter.frequency.setValueAtTime(220, ctx.currentTime);
  rumble.connect(rumbleFilter);
  rumbleFilter.connect(track.gain);
  rumble.start();
  track.source = rumble;

  track.timer = setInterval(() => {
    if(!track.playing || !ambientAudioCtx) return;
    if(Math.random() > 0.45){
      try {
        const clickBuf = ambientAudioCtx.createBuffer(1, Math.floor(ambientAudioCtx.sampleRate * 0.015), ambientAudioCtx.sampleRate);
        const cdata = clickBuf.getChannelData(0);
        for(let j = 0; j < cdata.length; j++){
          cdata[j] = (Math.random() * 2 - 1) * Math.exp(-j / (cdata.length * 0.3));
        }
        const clickSrc = ambientAudioCtx.createBufferSource();
        clickSrc.buffer = clickBuf;
        const clickGain = ambientAudioCtx.createGain();
        clickGain.gain.setValueAtTime(track.vol * (0.3 + Math.random() * 0.5), ambientAudioCtx.currentTime);
        clickSrc.connect(clickGain);
        clickGain.connect(track.gain);
        clickSrc.start();
      } catch(_){}
    }
  }, 120);
  track.playing = true;
}

function stopFire(){
  const track = ambientTracks.fire;
  if(!track.playing) return;
  if(track.timer) clearInterval(track.timer);
  try {
    track.source.stop();
    track.source.disconnect();
  } catch(_){}
  track.playing = false;
}

function startWaves(){
  const ctx = getAmbientAudioCtx();
  if(!ctx) return;
  const track = ambientTracks.waves;
  if(track.playing) return;
  const noiseBuf = createNoiseBuffer(4, 'pink');
  track.source = ctx.createBufferSource();
  track.source.buffer = noiseBuf;
  track.source.loop = true;
  track.filter = ctx.createBiquadFilter();
  track.filter.type = 'bandpass';
  track.filter.Q.setValueAtTime(1.2, ctx.currentTime);
  track.gain = ctx.createGain();
  track.gain.gain.setValueAtTime(track.vol * 0.6, ctx.currentTime);

  track.lfo = ctx.createOscillator();
  track.lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(320, ctx.currentTime);
  track.filter.frequency.setValueAtTime(450, ctx.currentTime);
  track.lfo.connect(lfoGain);
  lfoGain.connect(track.filter.frequency);
  track.lfo.start();

  track.source.connect(track.filter);
  track.filter.connect(track.gain);
  track.gain.connect(ambientMasterGain);
  track.source.start();
  track.playing = true;
}

function stopWaves(){
  const track = ambientTracks.waves;
  if(!track.playing) return;
  try {
    track.source.stop();
    track.source.disconnect();
    track.lfo.stop();
    track.lfo.disconnect();
  } catch(_){}
  track.playing = false;
}

function toggleAmbientTrack(type){
  getAmbientAudioCtx();
  if(type === 'rain'){
    if(ambientTracks.rain.playing) stopRain(); else startRain();
  } else if(type === 'fire'){
    if(ambientTracks.fire.playing) stopFire(); else startFire();
  } else if(type === 'waves'){
    if(ambientTracks.waves.playing) stopWaves(); else startWaves();
  }
  updateAmbientUI();
}

function updateAmbientUI(){
  const cardRain = document.getElementById('cardAmbientRain');
  const btnRain = document.getElementById('btnToggleRain');
  if(cardRain && btnRain){
    cardRain.classList.toggle('active', ambientTracks.rain.playing);
    btnRain.textContent = ambientTracks.rain.playing ? 'On' : 'Off';
  }
  const cardFire = document.getElementById('cardAmbientFire');
  const btnFire = document.getElementById('btnToggleFire');
  if(cardFire && btnFire){
    cardFire.classList.toggle('active', ambientTracks.fire.playing);
    btnFire.textContent = ambientTracks.fire.playing ? 'On' : 'Off';
  }
  const cardWaves = document.getElementById('cardAmbientWaves');
  const btnWaves = document.getElementById('btnToggleWaves');
  if(cardWaves && btnWaves){
    cardWaves.classList.toggle('active', ambientTracks.waves.playing);
    btnWaves.textContent = ambientTracks.waves.playing ? 'On' : 'Off';
  }
}

function openAmbientModal(){
  const overlay = document.getElementById('ambientOverlay');
  if(!overlay) return;
  updateAmbientUI();
  overlay.classList.add('show');
}

function closeAmbientModal(){
  const overlay = document.getElementById('ambientOverlay');
  if(overlay) overlay.classList.remove('show');
}

// --- 3. HANDS-FREE AUTO-PLAY WALK & SLEEP MODE ---
let hfPlaying = false;
let hfInterval = 3200;
let hfSleepTimeout = null;
let hfStepTimer = null;

function getCurrentActiveEntry(){
  if(displayedEntry) return displayedEntry;
  if(displayedWord) return getEntry(displayedWord);
  if(typeof WORDS !== 'undefined' && WORDS.length) return WORDS[0];
  return null;
}

function openHandsFreeModal(){
  const overlay = document.getElementById('handsFreeOverlay');
  if(!overlay) return;
  updateHfWordDisplay();
  overlay.classList.add('show');
}

function closeHandsFreeModal(){
  const overlay = document.getElementById('handsFreeOverlay');
  if(overlay) overlay.classList.remove('show');
  stopHandsFree();
}

function updateHfWordDisplay(){
  const curEntry = getCurrentActiveEntry();
  if(!curEntry) return;
  const wordEl = document.getElementById('hfCurrentWord');
  const ipaEl = document.getElementById('hfCurrentIpa');
  const trEl = document.getElementById('hfCurrentTr');
  const cefrEl = document.getElementById('hfCefrBadge');
  if(wordEl) wordEl.textContent = curEntry.word || curEntry.w || '';
  if(ipaEl) ipaEl.textContent = curEntry.ipa ? `/${curEntry.ipa}/` : '';
  if(trEl) trEl.textContent = wordTranslation(curEntry) || '';
  if(cefrEl){
    const lvl = (curEntry.level || curEntry.c || 'A1').toUpperCase();
    cefrEl.textContent = lvl;
    cefrEl.className = 'hf-badge ' + lvl.toLowerCase();
  }
}

function toggleHandsFreePlay(){
  if(hfPlaying){
    stopHandsFree();
  } else {
    startHandsFree();
  }
}

function startHandsFree(){
  hfPlaying = true;
  const playBtn = document.getElementById('btnHfPlayPause');
  const statusBadge = document.getElementById('hfStatusBadge');
  if(playBtn){
    playBtn.textContent = '⏸️ Pause';
    playBtn.classList.add('playing');
  }
  if(statusBadge){
    statusBadge.textContent = 'Playing';
    statusBadge.classList.add('active');
  }

  const sleepSel = document.getElementById('hfSleepSelect');
  const sleepMins = sleepSel ? Number(sleepSel.value) || 0 : 0;
  if(hfSleepTimeout) clearTimeout(hfSleepTimeout);
  if(sleepMins > 0){
    hfSleepTimeout = setTimeout(() => {
      stopHandsFree();
      showToast('Hands-Free Sleep Timer Completed 🌙');
    }, sleepMins * 60 * 1000);
  }

  runHandsFreeCycle();
}

function stopHandsFree(){
  hfPlaying = false;
  if(hfStepTimer) clearTimeout(hfStepTimer);
  if(hfSleepTimeout) clearTimeout(hfSleepTimeout);
  const playBtn = document.getElementById('btnHfPlayPause');
  const statusBadge = document.getElementById('hfStatusBadge');
  const bar = document.getElementById('hfProgressBar');
  if(playBtn){
    playBtn.textContent = '▶️ Start';
    playBtn.classList.remove('playing');
  }
  if(statusBadge){
    statusBadge.textContent = 'Paused';
    statusBadge.classList.remove('active');
  }
  if(bar) bar.style.width = '0%';
}

function runHandsFreeCycle(){
  if(!hfPlaying) return;
  updateHfWordDisplay();
  const curEntry = getCurrentActiveEntry();
  if(!curEntry) return;

  const delaySel = document.getElementById('hfDelaySelect');
  hfInterval = delaySel ? Number(delaySel.value) || 3200 : 3200;

  const bar = document.getElementById('hfProgressBar');
  if(bar){
    bar.style.transition = 'none';
    bar.style.width = '0%';
    setTimeout(() => {
      if(bar && hfPlaying){
        bar.style.transition = `width ${hfInterval}ms linear`;
        bar.style.width = '100%';
      }
    }, 40);
  }

  const voiceSel = document.getElementById('hfVoiceMode');
  const mode = voiceSel ? voiceSel.value : 'both';
  if(mode === 'uk' && curEntry.audio_uk){
    playAudio(curEntry.audio_uk);
  } else if(mode === 'us' && curEntry.audio_us){
    playAudio(curEntry.audio_us);
  } else {
    if(curEntry.audio_uk) playAudio(curEntry.audio_uk);
    setTimeout(() => {
      if(hfPlaying && curEntry.audio_us) playAudio(curEntry.audio_us);
    }, 1100);
  }

  hfStepTimer = setTimeout(() => {
    if(!hfPlaying) return;
    markWord(true);
    setTimeout(() => {
      if(hfPlaying) runHandsFreeCycle();
    }, 280);
  }, hfInterval);
}

// --- 4. GAMIFICATION BADGES & ACHIEVEMENTS (10 BADGES) ---
const ACHIEVEMENTS_DEF = [
  { id: 'first_word', icon: '🌱', title: 'First Step', desc: 'Master your very first English vocabulary card' },
  { id: 'explorer_50', icon: '🧭', title: 'Curious Mind', desc: 'Review and explore 50 unique vocabulary words' },
  { id: 'streak_3', icon: '🔥', title: 'Habit Builder', desc: 'Achieve a 3-day consecutive study streak' },
  { id: 'streak_7', icon: '⚡', title: 'Week Warrior', desc: 'Achieve an unbroken 7-day study streak' },
  { id: 'quiz_ace', icon: '🎯', title: 'Quiz Master', desc: 'Score 100% on any 10-question multiple-choice quiz' },
  { id: 'speed_demon', icon: '🏎️', title: 'Speed Racer', desc: 'Score 15+ correct answers in Speed Race Mode' },
  { id: 'spelling_bee', icon: '✍️', title: 'Orthographer', desc: 'Complete a spelling quiz with 100% accuracy' },
  { id: 'match_master', icon: '🧩', title: 'Memory Champ', desc: 'Clear a Word Match board in under 45 seconds' },
  { id: 'polyglot', icon: '🌍', title: 'CEFR Conqueror', desc: 'Learn words across all 5 CEFR levels (A1 to C1)' },
  { id: 'century_club', icon: '👑', title: 'Century Scholar', desc: 'Master 100+ words in SRS Review Stage 5' }
];

function getUnlockedAchievements(){
  try {
    const raw = localStorage.getItem('oxford_achievements');
    return raw ? JSON.parse(raw) : {};
  } catch(_){
    return {};
  }
}

function unlockAchievement(id){
  const unlocked = getUnlockedAchievements();
  if(unlocked[id]) return;
  const def = ACHIEVEMENTS_DEF.find(a => a.id === id);
  if(!def) return;
  unlocked[id] = Date.now();
  try {
    localStorage.setItem('oxford_achievements', JSON.stringify(unlocked));
  } catch(_){}
  showAchievementToast(def);
  if(typeof fireConfetti === 'function') fireConfetti();
}

function showAchievementToast(def){
  const container = document.getElementById('achievementToastContainer');
  if(!container) return;
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="toast-icon">${def.icon}</div>
    <div class="toast-body">
      <div class="toast-header">Achievement Unlocked!</div>
      <div class="toast-title">${def.title}</div>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px) scale(0.9)';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

function checkAchievements(){
  const unlocked = getUnlockedAchievements();
  const knownCount = Object.values(state.marks || {}).filter(m => m && m.s === 'k').length;
  if(knownCount >= 1 && !unlocked['first_word']) unlockAchievement('first_word');
  if(knownCount >= 50 && !unlocked['explorer_50']) unlockAchievement('explorer_50');

  const streak = (state.stats && state.stats.streak) ? state.stats.streak : 0;
  if(streak >= 3 && !unlocked['streak_3']) unlockAchievement('streak_3');
  if(streak >= 7 && !unlocked['streak_7']) unlockAchievement('streak_7');

  const box5Count = Object.values(state.srs || {}).filter(b => b === 5).length;
  if(box5Count >= 100 && !unlocked['century_club']) unlockAchievement('century_club');

  if(!unlocked['polyglot'] && typeof WORDS !== 'undefined' && WORDS.length > 0){
    const levelsFound = new Set();
    for(const [idOrWord, mark] of Object.entries(state.marks || {})){
      if(mark && mark.s === 'k'){
        const entry = getEntry(idOrWord);
        if(entry && entry.level) levelsFound.add(entry.level.toLowerCase());
      }
    }
    if(levelsFound.has('a1') && levelsFound.has('a2') && levelsFound.has('b1') && levelsFound.has('b2') && levelsFound.has('c1')){
      unlockAchievement('polyglot');
    }
  }
}

function openBadgesModal(){
  checkAchievements();
  const overlay = document.getElementById('badgesOverlay');
  if(!overlay) return;
  const grid = document.getElementById('badgesGrid');
  const unlocked = getUnlockedAchievements();
  const unlockedCount = Object.keys(unlocked).length;
  const total = ACHIEVEMENTS_DEF.length;
  const pct = Math.round((unlockedCount / total) * 100);

  const textEl = document.getElementById('badgesProgressText');
  const barEl = document.getElementById('badgesProgressBar');
  if(textEl) textEl.textContent = `${unlockedCount} / ${total} Unlocked (${pct}%)`;
  if(barEl) barEl.style.width = `${pct}%`;

  if(grid){
    grid.innerHTML = ACHIEVEMENTS_DEF.map(def => {
      const isDone = !!unlocked[def.id];
      return `
        <div class="badge-card ${isDone ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${def.icon}</div>
          <div class="badge-info">
            <div class="badge-title">${def.title}</div>
            <div class="badge-desc">${def.desc}</div>
            <span class="badge-tag">${isDone ? 'Unlocked ✅' : 'Locked 🔒'}</span>
          </div>
        </div>
      `;
    }).join('');
  }
  overlay.classList.add('show');
}

function closeBadgesModal(){
  const overlay = document.getElementById('badgesOverlay');
  if(overlay) overlay.classList.remove('show');
}

// --- 5. SMART FOCUS DECK / LEECH HUNTER ---
function getLeechMap(){
  try {
    const raw = localStorage.getItem('oxford_leeches');
    return raw ? JSON.parse(raw) : {};
  } catch(_){
    return {};
  }
}

function recordLeechWord(word){
  if(!word) return;
  const leeches = getLeechMap();
  leeches[word] = (leeches[word] || 0) + 1;
  try {
    localStorage.setItem('oxford_leeches', JSON.stringify(leeches));
  } catch(_){}
}

function openLeechesModal(){
  const overlay = document.getElementById('leechesOverlay');
  if(!overlay) return;
  const leeches = getLeechMap();
  const listEl = document.getElementById('leechesList');
  const countNum = document.getElementById('leechesCountNum');
  const wordsList = Object.entries(leeches).sort((a,b) => b[1] - a[1]);
  if(countNum) countNum.textContent = String(wordsList.length);

  if(listEl){
    if(wordsList.length === 0){
      listEl.innerHTML = `<div style="text-align:center;padding:30px;color:var(--muted);font-weight:600;">🎉 No tricky words found! You have great recall.</div>`;
    } else {
      listEl.innerHTML = wordsList.map(([w, fails]) => {
        const item = getEntry(w) || { level: 'A1', word: w };
        return `
          <div class="leech-item">
            <div>
              <span class="leech-word">${w}</span>
              <span class="review-group-badge ${(item.level || 'a1').toLowerCase()}">${(item.level || 'A1').toUpperCase()}</span>
              <span class="leech-sub">${wordTranslation(item) || ''}</span>
            </div>
            <span class="leech-fails-badge">${fails} ${fails === 1 ? 'lapse' : 'lapses'}</span>
          </div>
        `;
      }).join('');
    }
  }
  overlay.classList.add('show');
}

function closeLeechesModal(){
  const overlay = document.getElementById('leechesOverlay');
  if(overlay) overlay.classList.remove('show');
}

function startLeechDeck(){
  const leeches = getLeechMap();
  const leechKeys = Object.keys(leeches);
  if(leechKeys.length === 0){
    showToast('No tricky words recorded yet!');
    return;
  }
  closeLeechesModal();
  showToast(`🎯 Focusing on ${leechKeys.length} tricky words`);
}

function clearLeeches(){
  try {
    localStorage.removeItem('oxford_leeches');
  } catch(_){}
  openLeechesModal();
  showToast('Tricky words list cleared!');
}

// --- 6. PRINTABLE STUDY SHEETS & FLASHCARDS PDF ---
function openPrintModal(){
  const overlay = document.getElementById('printOverlay');
  if(!overlay) return;
  const countEl = document.getElementById('printCurrentCount');
  const curLevelWords = (typeof wordsOfLevel === 'function' && state.ui && state.ui.currentLevel) ? wordsOfLevel(state.ui.currentLevel) : (typeof WORDS !== 'undefined' ? WORDS : []);
  if(countEl) countEl.textContent = String(curLevelWords.length);
  overlay.classList.add('show');
}

function closePrintModal(){
  const overlay = document.getElementById('printOverlay');
  if(overlay) overlay.classList.remove('show');
}

function executePrint(){
  const printArea = document.getElementById('printArea');
  if(!printArea) return;

  const layout = (document.querySelector('input[name="printLayout"]:checked') || {}).value || 'grid';
  const source = (document.getElementById('printSourceSelect') || {}).value || 'current';
  const incIpa = (document.getElementById('printIncludeIpa') || {}).checked !== false;
  const incTr = (document.getElementById('printIncludeTr') || {}).checked !== false;
  const incEx = (document.getElementById('printIncludeEx') || {}).checked !== false;

  let printWords = [];
  if(source === 'current'){
    printWords = (typeof wordsOfLevel === 'function' && state.ui && state.ui.currentLevel) ? wordsOfLevel(state.ui.currentLevel).slice(0, 150) : (typeof WORDS !== 'undefined' ? WORDS.slice(0, 150) : []);
  } else if(source === 'bookmarked'){
    printWords = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => state.bookmarks && (state.bookmarks[w.id] || state.bookmarks[w.word]));
  } else if(source === 'leeches'){
    const lm = getLeechMap();
    printWords = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => lm[w.word]);
  } else if(['a1','a2','b1','b2','c1'].includes(source)){
    printWords = (typeof wordsOfLevel === 'function') ? wordsOfLevel(source).slice(0, 150) : [];
  }

  if(printWords.length === 0){
    showToast('No words found for this selection.');
    return;
  }

  let html = `
    <div class="print-header">
      <div>
        <h1 class="print-title">Oxford 5000 Study Cards</h1>
        <div class="print-meta">Oxford 3000 & 5000 Essential Vocabulary • Offline Learning Deck</div>
      </div>
      <div class="print-meta">${printWords.length} words • Formatted for A4</div>
    </div>
  `;

  if(layout === 'grid'){
    html += '<div class="print-cards-grid">';
    printWords.forEach(w => {
      const tr = wordTranslation(w) || '';
      html += `
        <div class="print-card-cutout">
          <div class="print-card-head">
            <span class="print-word">${w.word || w}</span>
            <span class="print-cefr">${(w.level || 'A1').toUpperCase()}</span>
          </div>
          ${incIpa && w.ipa ? `<div class="print-ipa">/${w.ipa}/</div>` : ''}
          ${incTr ? `<div class="print-tr">${tr}</div>` : ''}
          ${incEx && w.example ? `<div class="print-ex">“${w.example}”</div>` : ''}
        </div>
      `;
    });
    html += '</div>';
  } else {
    html += `
      <table class="print-table">
        <thead>
          <tr>
            <th>Word</th>
            <th>Level</th>
            ${incIpa ? '<th>Phonetics</th>' : ''}
            ${incTr ? '<th>Translation</th>' : ''}
            ${incEx ? '<th>Example Context</th>' : ''}
          </tr>
        </thead>
        <tbody>
    `;
    printWords.forEach(w => {
      const tr = wordTranslation(w) || '';
      html += `
        <tr>
          <td><strong>${w.word || w}</strong></td>
          <td>${(w.level || 'A1').toUpperCase()}</td>
          ${incIpa ? `<td>${w.ipa ? '/' + w.ipa + '/' : ''}</td>` : ''}
          ${incTr ? `<td>${tr}</td>` : ''}
          ${incEx ? `<td>${w.example || ''}</td>` : ''}
        </tr>
      `;
    });
    html += '</tbody></table>';
  }

  printArea.innerHTML = html;
  closePrintModal();
  setTimeout(() => {
    window.print();
  }, 200);
}

function wireV15ToolbarAndModals(){
  const btnHandsFree = document.getElementById('btnHandsFree');
  if(btnHandsFree) btnHandsFree.addEventListener('click', openHandsFreeModal);
  const closeHandsFreeBtn = document.getElementById('closeHandsFree');
  if(closeHandsFreeBtn) closeHandsFreeBtn.addEventListener('click', closeHandsFreeModal);
  const btnHfPlayPause = document.getElementById('btnHfPlayPause');
  if(btnHfPlayPause) btnHfPlayPause.addEventListener('click', toggleHandsFreePlay);
  const btnHfNext = document.getElementById('btnHfNext');
  if(btnHfNext) btnHfNext.addEventListener('click', () => {
    markWord(true);
    setTimeout(updateHfWordDisplay, 280);
  });
  const btnHfPrev = document.getElementById('btnHfPrev');
  if(btnHfPrev) btnHfPrev.addEventListener('click', () => {
    if(typeof undo === 'function') undo();
    setTimeout(updateHfWordDisplay, 280);
  });

  const btnBadges = document.getElementById('btnBadges');
  if(btnBadges) btnBadges.addEventListener('click', openBadgesModal);
  const closeBadgesBtn = document.getElementById('closeBadges');
  if(closeBadgesBtn) closeBadgesBtn.addEventListener('click', closeBadgesModal);

  const btnLeeches = document.getElementById('btnLeeches');
  if(btnLeeches) btnLeeches.addEventListener('click', openLeechesModal);
  const closeLeechesBtn = document.getElementById('closeLeeches');
  if(closeLeechesBtn) closeLeechesBtn.addEventListener('click', closeLeechesModal);
  const btnStartLeechDeck = document.getElementById('btnStartLeechDeck');
  if(btnStartLeechDeck) btnStartLeechDeck.addEventListener('click', startLeechDeck);
  const btnClearLeeches = document.getElementById('btnClearLeeches');
  if(btnClearLeeches) btnClearLeeches.addEventListener('click', clearLeeches);

  const btnPrint = document.getElementById('btnPrint');
  if(btnPrint) btnPrint.addEventListener('click', openPrintModal);
  const closePrintBtn = document.getElementById('closePrint');
  if(closePrintBtn) closePrintBtn.addEventListener('click', closePrintModal);
  const btnExecutePrint = document.getElementById('btnExecutePrint');
  if(btnExecutePrint) btnExecutePrint.addEventListener('click', executePrint);

  const btnAmbient = document.getElementById('btnAmbient');
  if(btnAmbient) btnAmbient.addEventListener('click', openAmbientModal);
  const closeAmbientBtn = document.getElementById('closeAmbient');
  if(closeAmbientBtn) closeAmbientBtn.addEventListener('click', closeAmbientModal);
  const btnToggleRain = document.getElementById('btnToggleRain');
  if(btnToggleRain) btnToggleRain.addEventListener('click', () => toggleAmbientTrack('rain'));
  const btnToggleFire = document.getElementById('btnToggleFire');
  if(btnToggleFire) btnToggleFire.addEventListener('click', () => toggleAmbientTrack('fire'));
  const btnToggleWaves = document.getElementById('btnToggleWaves');
  if(btnToggleWaves) btnToggleWaves.addEventListener('click', () => toggleAmbientTrack('waves'));

  const ambientMasterVol = document.getElementById('ambientMasterVol');
  if(ambientMasterVol) ambientMasterVol.addEventListener('input', (e) => {
    const val = Number(e.target.value) / 100;
    if(ambientMasterGain && ambientAudioCtx) ambientMasterGain.gain.setValueAtTime(val, ambientAudioCtx.currentTime);
  });
  const volRain = document.getElementById('volRain');
  if(volRain) volRain.addEventListener('input', (e) => {
    ambientTracks.rain.vol = Number(e.target.value) / 100;
    if(ambientTracks.rain.gain && ambientAudioCtx) ambientTracks.rain.gain.gain.setValueAtTime(ambientTracks.rain.vol * 0.8, ambientAudioCtx.currentTime);
  });
  const volFire = document.getElementById('volFire');
  if(volFire) volFire.addEventListener('input', (e) => {
    ambientTracks.fire.vol = Number(e.target.value) / 100;
    if(ambientTracks.fire.gain && ambientAudioCtx) ambientTracks.fire.gain.gain.setValueAtTime(ambientTracks.fire.vol * 0.7, ambientAudioCtx.currentTime);
  });
  const volWaves = document.getElementById('volWaves');
  if(volWaves) volWaves.addEventListener('input', (e) => {
    ambientTracks.waves.vol = Number(e.target.value) / 100;
    if(ambientTracks.waves.gain && ambientAudioCtx) ambientTracks.waves.gain.gain.setValueAtTime(ambientTracks.waves.vol * 0.6, ambientAudioCtx.currentTime);
  });

  const btnAmbientMasterToggle = document.getElementById('btnAmbientMasterToggle');
  if(btnAmbientMasterToggle) btnAmbientMasterToggle.addEventListener('click', () => {
    ambientMuted = !ambientMuted;
    if(ambientMasterGain && ambientAudioCtx){
      ambientMasterGain.gain.setValueAtTime(ambientMuted ? 0 : (Number(ambientMasterVol.value) / 100), ambientAudioCtx.currentTime);
    }
    btnAmbientMasterToggle.textContent = ambientMuted ? '🔈 Unmute' : '🔊 Mute All';
  });

  ['handsFreeOverlay', 'badgesOverlay', 'leechesOverlay', 'printOverlay', 'ambientOverlay'].forEach(id => {
    const el = document.getElementById(id);
    if(el){
      el.addEventListener('click', (e) => {
        if(e.target === el){
          if(id === 'handsFreeOverlay') closeHandsFreeModal();
          else if(id === 'badgesOverlay') closeBadgesModal();
          else if(id === 'leechesOverlay') closeLeechesModal();
          else if(id === 'printOverlay') closePrintModal();
          else if(id === 'ambientOverlay') closeAmbientModal();
        }
      });
    }
  });
}"""

if re.search(pattern, content):
    content = re.sub(pattern, clean_v15_code, content, count=1)
    print("Replaced with clean v1.5 code!")
else:
    print("WARNING: Pattern not found for replacement!")

with open(app_js_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated app.js successfully!")
