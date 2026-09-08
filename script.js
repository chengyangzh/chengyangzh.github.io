const gate = document.getElementById('tapeGate');
const siteShell = document.getElementById('siteShell');
const cassette = document.getElementById('cassette');
const dropSlot = document.getElementById('dropSlot');
const gateStatus = document.getElementById('gateStatus');
const gateCounter = document.getElementById('gateCounter');
const bootFill = document.getElementById('bootFill');
const skipIntro = document.getElementById('skipIntro');
const replayIntro = document.getElementById('replayIntro');
const soundToggle = document.getElementById('soundToggle');
const nowPlaying = document.getElementById('nowPlaying');
const timecode = document.getElementById('timecode');
const backToTop = document.getElementById('backToTop');

let entering = false;
let soundOn = true;
let audioContext = null;

function getAudioContext(){
  if(!audioContext){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(Ctx) audioContext = new Ctx();
  }
  return audioContext;
}

function blip(frequency = 220, duration = 0.06, type = 'square', volume = 0.025, delay = 0){
  if(!soundOn) return;
  const ctx = getAudioContext();
  if(!ctx) return;
  const start = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function tapeSound(){
  blip(95, 0.08, 'square', 0.035, 0);
  blip(150, 0.05, 'square', 0.02, 0.08);
  blip(280, 0.11, 'triangle', 0.018, 0.22);
  blip(330, 0.08, 'triangle', 0.012, 0.34);
}

function revealSite(immediate = false){
  siteShell.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('gate-open');

  if(immediate){
    gate.hidden = true;
    gate.classList.remove('is-leaving');
    return;
  }

  gate.classList.add('is-leaving');
  window.setTimeout(() => {
    gate.hidden = true;
  }, 760);
}

function insertTape(){
  if(entering) return;
  entering = true;
  tapeSound();

  gateStatus.textContent = 'READING TAPE';
  gateCounter.textContent = '00:01';
  cassette.classList.add('is-inserting', 'playing');
  dropSlot.classList.add('inserted');
  bootFill.classList.add('loading');

  window.setTimeout(() => {
    gateStatus.textContent = 'PLAY ▶';
    blip(440, 0.06, 'square', 0.018);
    blip(660, 0.08, 'square', 0.015, 0.07);
  }, 760);

  window.setTimeout(() => revealSite(false), 1450);
}

function resetIntro(){
  entering = false;
  gate.hidden = false;
  gate.classList.remove('is-leaving');
  document.body.classList.add('gate-open');
  siteShell.setAttribute('aria-hidden', 'true');
  gateStatus.textContent = 'NO TAPE';
  gateCounter.textContent = '00:00';
  cassette.classList.remove('is-inserting', 'playing');
  dropSlot.classList.remove('inserted', 'drag-over');
  bootFill.classList.remove('loading');
  window.setTimeout(() => cassette.focus({preventScroll:true}), 30);
}

cassette.addEventListener('click', insertTape);
cassette.addEventListener('dragstart', event => {
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', 'research-mixtape');
  blip(120, 0.04, 'square', 0.015);
});

dropSlot.addEventListener('dragover', event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  dropSlot.classList.add('drag-over');
});

dropSlot.addEventListener('dragleave', () => dropSlot.classList.remove('drag-over'));
dropSlot.addEventListener('drop', event => {
  event.preventDefault();
  dropSlot.classList.remove('drag-over');
  insertTape();
});

skipIntro.addEventListener('click', () => {
  entering = true;
  revealSite(true);
});

replayIntro.addEventListener('click', resetIntro);

soundToggle.addEventListener('click', () => {
  soundOn = !soundOn;
  soundToggle.textContent = `sound: ${soundOn ? 'on' : 'off'}`;
  soundToggle.setAttribute('aria-pressed', String(soundOn));
  if(soundOn) blip(330, 0.06, 'square', 0.02);
});

// Treat the whole page like one 46-minute research mixtape.
function updateTapeTime(){
  const root = document.documentElement;
  const maxScroll = Math.max(1, root.scrollHeight - root.clientHeight);
  const progress = Math.min(1, Math.max(0, root.scrollTop / maxScroll));
  const totalSeconds = Math.floor(progress * 46 * 60);
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  timecode.textContent = `${mins}:${secs}`;
}

window.addEventListener('scroll', updateTapeTime, {passive:true});
window.addEventListener('resize', updateTapeTime);
updateTapeTime();

const trackSections = [...document.querySelectorAll('[data-track]')];
const trackObserver = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a,b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
  if(visible.length){
    nowPlaying.textContent = visible[0].target.dataset.track;
  }
}, {rootMargin:'-24% 0px -58% 0px', threshold:[0,0.1,0.5]});
trackSections.forEach(section => trackObserver.observe(section));

backToTop.addEventListener('click', () => {
  document.getElementById('home').scrollIntoView({behavior:'smooth'});
});

// Tiny tactile feedback on in-page transport links.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => blip(210, 0.035, 'square', 0.008));
});

// Give keyboard users an immediate escape hatch from the intro.
gate.addEventListener('keydown', event => {
  if(event.key === 'Escape'){
    entering = true;
    revealSite(true);
  }
});

// Respect reduced motion by making the insertion sequence nearly instant.
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  cassette.addEventListener('click', () => revealSite(true), {once:true});
}
