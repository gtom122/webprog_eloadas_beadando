const table = document.getElementById('dataTable');
const ctx = document.getElementById('chartCanvas').getContext('2d');
let chart;

const labels = ['2009', '2010', '2011', '2012', '2013'];

table.addEventListener('click', function(e) {
  const row = e.target.closest('tr');
  if (!row || row.rowIndex === 0) return;

  const name = row.cells[0].textContent; // név
  const values = Array.from(row.cells)
                      .slice(1)
                      .map(cell => parseInt(cell.textContent));

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: name,
        data: values,
        borderColor: 'darkred',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${name} eredményei (2009-2013)`,
          font: { size: 18 }
        },
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Év'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Pontszám'
          },
          beginAtZero: true
        }
      }
    }
  });
});
