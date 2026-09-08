const body = document.body;
const intro = document.getElementById('intro');
const site = document.getElementById('site');
const cassette = document.getElementById('cassette');
const walkman = document.getElementById('walkman');
const slot = document.getElementById('slot');
const slotStatus = document.getElementById('slotStatus');
const introCounter = document.getElementById('introCounter');
const introInstruction = document.getElementById('introInstruction');
const skipIntro = document.getElementById('skipIntro');
const replayIntro = document.getElementById('replayIntro');

let entering = false;
let sequenceTimers = [];

function clearSequenceTimers(){
  sequenceTimers.forEach(clearTimeout);
  sequenceTimers = [];
}

function mechanicalClick(){
  if(!window.AudioContext && !window.webkitAudioContext) return;
  try{
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    oscA.type = 'square';
    oscB.type = 'triangle';
    oscA.frequency.setValueAtTime(92, now);
    oscB.frequency.setValueAtTime(54, now);
    gain.gain.setValueAtTime(0.022, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    oscA.connect(gain);
    oscB.connect(gain);
    gain.connect(ctx.destination);
    oscA.start(now);
    oscB.start(now + 0.009);
    oscA.stop(now + 0.06);
    oscB.stop(now + 0.075);
    oscB.addEventListener('ended', () => ctx.close());
  }catch(_){ /* quiet fallback */ }
}

function finishOpen(){
  body.classList.remove('intro-open');
  intro.setAttribute('aria-hidden', 'true');
  site.setAttribute('aria-hidden', 'false');
  entering = false;
  window.scrollTo({top:0, behavior:'auto'});
}

function openSite({instant = false} = {}){
  if(entering) return;
  entering = true;
  clearSequenceTimers();
  slotStatus.textContent = 'READING';
  introCounter.textContent = '00:01';
  walkman.classList.add('playing');
  cassette.classList.add('inserting');
  introInstruction.textContent = 'side a';
  mechanicalClick();

  if(instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    slotStatus.textContent = 'PLAY';
    introCounter.textContent = '00:03';
    finishOpen();
    return;
  }

  sequenceTimers.push(setTimeout(() => {
    slotStatus.textContent = 'SIDE A';
    introCounter.textContent = '00:02';
  }, 360));

  sequenceTimers.push(setTimeout(() => {
    slotStatus.textContent = 'PLAY';
    introCounter.textContent = '00:03';
  }, 690));

  sequenceTimers.push(setTimeout(finishOpen, 1080));
}

function resetIntro(){
  clearSequenceTimers();
  body.classList.add('intro-open');
  intro.setAttribute('aria-hidden', 'false');
  site.setAttribute('aria-hidden', 'true');
  cassette.classList.remove('inserting');
  walkman.classList.remove('playing');
  slot.classList.remove('drag-over');
  slotStatus.textContent = 'NO TAPE';
  introCounter.textContent = '00:00';
  introInstruction.textContent = 'click the tape, or drag it into the player';
  entering = false;
  setTimeout(() => cassette.focus(), 50);
}

cassette.addEventListener('click', () => openSite());
skipIntro.addEventListener('click', () => openSite({instant:true}));
replayIntro.addEventListener('click', resetIntro);

document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape' && body.classList.contains('intro-open')){
    openSite({instant:true});
  }
});

cassette.addEventListener('dragstart', (event) => {
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', 'cassette');
});

walkman.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  slot.classList.add('drag-over');
});

walkman.addEventListener('dragleave', (event) => {
  if(!walkman.contains(event.relatedTarget)) slot.classList.remove('drag-over');
});

walkman.addEventListener('drop', (event) => {
  event.preventDefault();
  slot.classList.remove('drag-over');
  openSite();
});

window.addEventListener('pageshow', (event) => {
  if(event.persisted && !body.classList.contains('intro-open')){
    site.setAttribute('aria-hidden', 'false');
  }
});