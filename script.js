(() => {
  const counter = document.getElementById('lcdCounter');
  const status = document.getElementById('lcdStatus');
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
    const label = button.dataset.track || 'PLAY';
    button.addEventListener('mouseenter', () => { if (status) status.textContent = label; });
    button.addEventListener('mouseleave', () => { if (status) status.textContent = 'PLAY'; });
    button.addEventListener('focus', () => { if (status) status.textContent = label; });
    button.addEventListener('blur', () => { if (status) status.textContent = 'PLAY'; });
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const href = button.getAttribute('href');
      if (status) status.textContent = label;
      button.classList.add('is-pressed');
      document.getElementById('walkman')?.classList.add('changing-track');
      setTimeout(() => { window.location.href = href; }, 190);
    });
  });
})();
