const body = document.body;
const intro = document.getElementById('intro');
const site = document.getElementById('site');
const cassette = document.getElementById('cassette');
const walkman = document.getElementById('walkman');
const slot = document.getElementById('slot');
const slotStatus = document.getElementById('slotStatus');
const introInstruction = document.getElementById('introInstruction');
const skipIntro = document.getElementById('skipIntro');
const replayIntro = document.getElementById('replayIntro');

let entering = false;

function clickSound(){
  if(!window.AudioContext && !window.webkitAudioContext) return;
  try{
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 105;
    gain.gain.setValueAtTime(0.018, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
    osc.addEventListener('ended', () => ctx.close());
  }catch(_){ /* silent fallback */ }
}

function openSite({instant = false} = {}){
  if(entering) return;
  entering = true;
  slotStatus.textContent = 'SIDE A';
  walkman.classList.add('playing');
  cassette.classList.add('inserting');
  introInstruction.textContent = 'playing';
  clickSound();

  const finish = () => {
    body.classList.remove('intro-open');
    intro.setAttribute('aria-hidden', 'true');
    site.setAttribute('aria-hidden', 'false');
    entering = false;
    window.scrollTo({top:0, behavior:'auto'});
  };

  if(instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    finish();
  }else{
    setTimeout(finish, 620);
  }
}

function resetIntro(){
  body.classList.add('intro-open');
  intro.setAttribute('aria-hidden', 'false');
  site.setAttribute('aria-hidden', 'true');
  cassette.classList.remove('inserting');
  walkman.classList.remove('playing');
  slot.classList.remove('drag-over');
  slotStatus.textContent = 'EMPTY';
  introInstruction.textContent = 'click the cassette, or drag it into the player';
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

walkman.addEventListener('dragleave', () => slot.classList.remove('drag-over'));

walkman.addEventListener('drop', (event) => {
  event.preventDefault();
  slot.classList.remove('drag-over');
  openSite();
});

// Keep the intro as a deliberate first-visit gesture, but do not trap returning
// visitors who use the browser's back/forward cache.
window.addEventListener('pageshow', (event) => {
  if(event.persisted && !body.classList.contains('intro-open')){
    site.setAttribute('aria-hidden', 'false');
  }
});