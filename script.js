(() => {
  const counter = document.getElementById('lcdCounter');
  let seconds = 17;
  if (counter) {
    setInterval(() => {
      seconds = (seconds + 1) % (46 * 60);
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      counter.textContent = `${m}:${s}`;
    }, 1000);
  }

  document.querySelectorAll('.tape-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const href = button.getAttribute('href');
      const label = button.dataset.track || 'PLAY';
      document.getElementById('lcdStatus')?.replaceChildren(document.createTextNode(label));
      button.classList.add('is-pressed');
      setTimeout(() => { window.location.href = href; }, 180);
    });
  });
})();
