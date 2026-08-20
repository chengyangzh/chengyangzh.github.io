// ---------- typed terminal line ----------
const lines = [
  "compiling a personal grammar...",
  "cross-linguistic animacy hierarchy: loading",
  "building models that remember where language comes from",
  "student researcher, mostly caffeinated"
];
const termEl = document.getElementById('terminal');
let li = 0, ci = 0, deleting = false;

function typeLoop(){
  const current = lines[li];
  if(!deleting){
    ci++;
    termEl.textContent = current.slice(0, ci);
    if(ci === current.length){
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    ci--;
    termEl.textContent = current.slice(0, ci);
    if(ci === 0){
      deleting = false;
      li = (li + 1) % lines.length;
    }
  }
  setTimeout(typeLoop, deleting ? 28 : 42);
}
typeLoop();

// ---------- toy sentence tagger ----------
// Not real NLP -- a small heuristic word-list tagger, purely for fun.
const DET   = new Set(['the','a','an','this','that','these','those','my','your','his','her','its','our','their']);
const PRON  = new Set(['i','you','he','she','it','we','they','me','him','her','us','them','who','what','which']);
const PREP  = new Set(['in','on','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','of','over','under']);
const CONJ  = new Set(['and','or','but','so','yet','nor','because','although','if','while']);
const BE    = new Set(['am','is','are','was','were','be','been','being']);
const COMMON_VERBS = new Set(['study','build','parse','run','walk','talk','sat','sit','eat','ate','go','went','make','made','write','wrote','read','think','thought','know','knew','see','saw','love','like','play','jump','sing','sang','dance','speak','spoke','learn','teach','taught','have','has','had','do','does','did','say','said','get','got','give','gave','take','took']);
const COMMON_ADJ = new Set(['big','small','good','bad','happy','sad','quick','slow','old','new','tall','short','loud','quiet','bright','dark','soft','hard','clean','smooth','pixel','pixelated','fun','interactive','creative','clean']);

function tag(word){
  const w = word.toLowerCase().replace(/[^a-z']/g, '');
  if(w === '') return 'other';
  if(DET.has(w)) return 'det';
  if(PRON.has(w)) return 'pron';
  if(PREP.has(w)) return 'prep';
  if(CONJ.has(w)) return 'other';
  if(BE.has(w) || COMMON_VERBS.has(w)) return 'verb';
  if(COMMON_ADJ.has(w)) return 'adj';
  if(w.endsWith('ing') || w.endsWith('ed')) return 'verb';
  if(w.endsWith('ly')) return 'adj';
  return 'noun';
}

const LABELS = { det:'DET', pron:'PRON', prep:'PREP', verb:'V', adj:'ADJ', noun:'N', other:'·' };

const input  = document.getElementById('parseInput');
const btn    = document.getElementById('parseBtn');
const output = document.getElementById('parseOutput');

function runParse(){
  const text = input.value.trim();
  output.innerHTML = '';
  if(!text) return;
  const words = text.split(/\s+/);
  words.forEach((word, i) => {
    const category = tag(word);
    const el = document.createElement('div');
    el.className = 'tok ' + category;
    el.style.animationDelay = (i * 0.05) + 's';
    el.innerHTML = `<span>${word}</span><small>${LABELS[category]}</small>`;
    output.appendChild(el);
  });
}

btn.addEventListener('click', runParse);
input.addEventListener('keydown', (e) => { if(e.key === 'Enter') runParse(); });

// seed with an example on first load
window.addEventListener('DOMContentLoaded', () => {
  input.value = 'the cat sat on the pixelated mat';
  runParse();
});
