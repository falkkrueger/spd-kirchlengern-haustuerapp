// Wartet, bis der DOM geladen ist, bevor Event-Listener gesetzt werden
document.addEventListener('DOMContentLoaded', () => {
  const tubes = document.querySelectorAll('.tube');
  tubes.forEach(tube => {
    tube.addEventListener('click', () => {
      // Stimmenzähler erhöhen
      const countElem = tube.querySelector('.tube-count');
      let count = parseInt(countElem.textContent) || 0;
      count += 1;
      countElem.textContent = count;

      // Neue Kugel erstellen, die in die Röhre fällt
      const tubeGraphic = tube.querySelector('.tube-graphic');
      const ball = document.createElement('div');
      ball.classList.add('ball');
      // Kugel am oberen Rand der Tube einsetzen
      tubeGraphic.appendChild(ball);

      // Kurz warten, um die Kugel-Positionierung im DOM zu initialisieren
      void ball.offsetHeight;  // Force Reflow (Browser-Layout aktualisieren)

      // Endposition der Kugel berechnen (so dass sie auf bereits vorhandenen Kugeln landet)
      const tubeHeight = tubeGraphic.offsetHeight;
      const ballDiameter = ball.offsetHeight || 20;  // Höhe der Kugel (laut CSS 20px)
      const ballCount = tubeGraphic.querySelectorAll('.ball').length;
      // Berechne den Abstand von oben: Tube-Höhe minus Höhe aller Kugeln
      let targetTop = tubeHeight - ballDiameter * ballCount;
      if (targetTop < 0) targetTop = 0;  // falls die Tube "überläuft", Oberkante als Limit

      // Neue Position setzen (Animation durch CSS-Transition)
      ball.style.top = targetTop + 'px';
    });
  });
});
