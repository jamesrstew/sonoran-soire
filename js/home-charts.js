(function () {
  'use strict';

  function wrapLabel(label, maxLen) {
    maxLen = maxLen || 14;
    if (typeof label !== 'string' || label.length <= maxLen) return label;
    var words = label.split(' ');
    var lines = [];
    var cur = words[0];
    for (var i = 1; i < words.length; i++) {
      if (cur.length + 1 + words[i].length <= maxLen) cur += ' ' + words[i];
      else { lines.push(cur); cur = words[i]; }
    }
    lines.push(cur);
    return lines;
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    if (typeof Chart === 'undefined') return;

    var pink = '#c71585';
    var orange = '#ff6b35';
    var cactus = '#2d5a27';
    var purple = '#9b0b5c';

    // Energy / Vibe
    var energyEl = document.getElementById('energyChart');
    if (energyEl) {
      new Chart(energyEl, {
        type: 'line',
        data: {
          labels: ['Arrival', 'Fri Night', 'Sat Pool', 'Disco', 'Spa', 'Hibachi', 'Exit'].map(wrapLabel),
          datasets: [{
            data: [45, 80, 90, 100, 30, 70, 15],
            borderColor: pink,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: pink,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(199, 21, 133, 0.12)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { display: false, beginAtZero: true, max: 110 },
            x: { display: false, grid: { display: false } }
          }
        }
      });
    }

    // Cocktail radar
    var radarEl = document.getElementById('cocktailRadar');
    if (radarEl) {
      new Chart(radarEl, {
        type: 'radar',
        data: {
          labels: ['Spicy', 'Sweet', 'Boozy', 'Refreshing', 'Aesthetic'],
          datasets: [
            { label: 'Spicy Paloma', data: [95, 30, 70, 80, 85], borderColor: orange, backgroundColor: 'rgba(255, 107, 53, 0.2)' },
            { label: 'Aperol Spritz', data: [10, 80, 50, 95, 100], borderColor: pink, backgroundColor: 'rgba(199, 21, 133, 0.2)' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { r: { ticks: { display: false }, grid: { color: 'rgba(199, 21, 133, 0.08)' } } }
        }
      });
    }

    // Attire doughnut
    var attireEl = document.getElementById('attireChart');
    if (attireEl) {
      new Chart(attireEl, {
        type: 'doughnut',
        data: {
          labels: ['Swimwear', 'Western', 'Custom Shirts', 'Metallic'].map(wrapLabel),
          datasets: [{
            data: [35, 25, 25, 15],
            backgroundColor: [purple, orange, '#ffd700', pink],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  });
})();
