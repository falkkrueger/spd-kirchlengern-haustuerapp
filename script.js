// Wartet, bis der DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  const setupSection = document.getElementById('setup');
  const votingSection = document.getElementById('voting');
  const tubesContainer = document.querySelector('.tubes');
  const tubeNumberSelect = document.getElementById('tube-number');
  const labelInputs = document.querySelectorAll('#label-inputs .label-input');

  function updateLabelInputs() {
    const count = parseInt(tubeNumberSelect.value, 10);
    labelInputs.forEach((input, index) => {
      input.style.display = index < count ? 'block' : 'none';
    });
  }

  tubeNumberSelect.addEventListener('change', updateLabelInputs);
  updateLabelInputs();

  document.getElementById('config-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const count = parseInt(tubeNumberSelect.value, 10);
    tubesContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const label = labelInputs[i].value.trim() || `Thema ${i + 1}`;
      const tube = document.createElement('div');
      tube.classList.add('tube');
      tube.dataset.theme = (i + 1).toString();

      const countDiv = document.createElement('div');
      countDiv.classList.add('tube-count');
      countDiv.textContent = '0';

      const graphicDiv = document.createElement('div');
      graphicDiv.classList.add('tube-graphic');

      const labelDiv = document.createElement('div');
      labelDiv.classList.add('tube-label');
      labelDiv.textContent = label;

      tube.appendChild(countDiv);
      tube.appendChild(graphicDiv);
      tube.appendChild(labelDiv);
      tubesContainer.appendChild(tube);
    }

    attachListeners();
    setupSection.classList.add('hidden');
    votingSection.classList.remove('hidden');
  });

  function attachListeners() {
    const tubes = document.querySelectorAll('.tube');
    tubes.forEach(tube => {
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
        ball.style.top = `${targetTop}px`;
      });
    });
  }
});
