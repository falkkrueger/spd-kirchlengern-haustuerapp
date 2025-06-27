// Dynamisches Erstellen der Röhren nach Konfiguration
function createTubes(labels) {
  const container = document.querySelector('.tubes');
  container.innerHTML = '';
  labels.forEach((label, index) => {
    const tube = document.createElement('div');
    tube.classList.add('tube');
    tube.dataset.theme = index + 1;
    tube.innerHTML = `
      <div class="tube-count">0</div>
      <div class="tube-graphic"></div>
      <div class="tube-label">${label}</div>`;
    container.appendChild(tube);
  });
}

// Klick-Events für alle Röhren setzen
function setupTubeListeners() {
  document.querySelectorAll('.tube').forEach(tube => {
    tube.addEventListener('click', () => {
      const countElem = tube.querySelector('.tube-count');
      let count = parseInt(countElem.textContent) || 0;
      count += 1;
      countElem.textContent = count;

      const tubeGraphic = tube.querySelector('.tube-graphic');
      const ball = document.createElement('div');
      ball.classList.add('ball');
      tubeGraphic.appendChild(ball);

      void ball.offsetHeight;
      const tubeHeight = tubeGraphic.offsetHeight;
      const ballDiameter = ball.offsetHeight || 20;
      const ballCount = tubeGraphic.querySelectorAll('.ball').length;
      let targetTop = tubeHeight - ballDiameter * ballCount;
      if (targetTop < 0) targetTop = 0;
      ball.style.top = targetTop + 'px';
    });
  });
}

// Beim Laden der Seite Konfiguration prüfen und Röhren erstellen
document.addEventListener('DOMContentLoaded', () => {
  let config = localStorage.getItem('tubeConfig');
  if (config) {
    try { config = JSON.parse(config); } catch (e) { config = null; }
  }
  if (!config) {
    let num;
    do {
      const input = prompt('Wie viele Säulen sollen angezeigt werden? (2-5)');
      if (input === null) return;
      num = parseInt(input, 10);
    } while (isNaN(num) || num < 2 || num > 5);

    const labels = [];
    for (let i = 0; i < num; i++) {
      let label = prompt(`Beschriftung für Säule ${i + 1}:`) || `Thema ${i + 1}`;
      labels.push(label);
    }
    config = { labels };
    localStorage.setItem('tubeConfig', JSON.stringify(config));
  }

  createTubes(config.labels);
  setupTubeListeners();
});
