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
    var hasChart = (typeof Chart !== 'undefined');
    var pink = '#c71585';
    var orange = '#ff6b35';
    var cactus = '#2d5a27';
    var purple = '#9b0b5c';

    // Energy / Vibe
    var energyEl = document.getElementById('energyChart');
    if (energyEl && hasChart) {
      new Chart(energyEl, {
        type: 'line',
        data: {
          labels: ['Arrival (Fri)', 'Fri Night', 'Sat Pool', 'Disco Night', 'Spa Sunday', 'Hibachi', 'Mon Exit'].map(wrapLabel),
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
    if (radarEl && hasChart) {
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
          layout: { padding: { top: 8, right: 12, bottom: 8, left: 12 } },
          scales: {
            r: {
              ticks: { display: false },
              grid: { color: 'rgba(199, 21, 133, 0.08)' },
              pointLabels: { padding: 6, font: { size: 10 } }
            }
          }
        }
      });
    }

    // Attire doughnut
    var attireEl = document.getElementById('attireChart');
    if (attireEl && hasChart) {
      new Chart(attireEl, {
        type: 'doughnut',
        data: {
          labels: ['Swimwear', 'Western Props', 'Custom Shirts', 'Metallic Liner'].map(wrapLabel),
          datasets: [{
            data: [35, 25, 25, 15],
            backgroundColor: [purple, orange, '#ffd700', pink],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 8, right: 8, bottom: 12, left: 8 } },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // Saturday heatmap (Plotly)
    var heatmapEl = document.getElementById('heatmapContainer');
    if (heatmapEl && typeof Plotly !== 'undefined') {
      var xValues = ['10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'];
      var yValues = ['Chill', 'Pool', 'Food', 'Dancing'];
      var zValues = [
        [10, 5, 2, 0, 0, 0, 0],
        [0, 8, 10, 5, 0, 0, 0],
        [0, 0, 3, 8, 10, 5, 0],
        [0, 0, 0, 2, 5, 10, 10]
      ];

      Plotly.newPlot(heatmapEl, [{
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'heatmap',
        colorscale: [[0, '#FFFBF0'], [0.5, '#F76C6C'], [1, '#6A0572']],
        showscale: false
      }], {
        margin: { t: 5, b: 30, l: 60, r: 10 },
        paper_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      var fallback = document.querySelector('.heatmap-fallback');
      if (fallback) fallback.classList.add('is-hidden');
    } else if (heatmapEl) {
      heatmapEl.style.display = 'none';
    }
  });
})();
