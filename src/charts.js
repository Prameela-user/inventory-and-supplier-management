import Chart from 'chart.js/auto';

const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

// 1. Dashboard Stock Overview Donut Chart
export function renderStockDonutChart(canvasId, products) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const inStock = products.filter(p => p.status === 'in').length;
  const lowStock = products.filter(p => p.status === 'low').length;
  const outStock = products.filter(p => p.status === 'out').length;

  chartInstances[canvasId] = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['In-Stock', 'Low-Stock', 'Out-of-Stock'],
      datasets: [{
        data: [inStock, lowStock, outStock],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: 'Plus Jakarta Sans', weight: '700', size: 12 },
            padding: 16,
            usePointStyle: true
          }
        }
      },
      cutout: '72%'
    }
  });
}

// 2. Dashboard Stock Level Trend & AI Forecast Chart
export function renderStockTrendChart(canvasId) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const labels = ['Sep 16', 'Sep 18', 'Sep 20', 'Sep 22', 'Sep 24', 'Sep 26', 'Sep 28', 'Oct 01 (FC)', 'Oct 03 (FC)'];
  
  chartInstances[canvasId] = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Actual Stock Movement',
          data: [1250, 1180, 1100, 980, 1050, 920, 840, null, null],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'AI Predictive Trend (No Restock)',
          data: [null, null, null, null, null, null, 840, 690, 520],
          borderColor: '#f43f5e',
          borderDash: [5, 5],
          tension: 0.4,
          pointRadius: 4
        },
        {
          label: 'AI Forecast with Auto-PO',
          data: [null, null, null, null, null, null, 840, 1280, 1420],
          borderColor: '#10b981',
          tension: 0.4,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'Plus Jakarta Sans', weight: '600', size: 11 } }
        }
      },
      scales: {
        y: {
          grid: { color: '#e2e8f0' },
          ticks: { font: { family: 'Plus Jakarta Sans' } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Plus Jakarta Sans' } }
        }
      }
    }
  });
}

// 3. Supplier Performance Bar Chart
export function renderSupplierChart(canvasId, suppliers) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const labels = suppliers.map(s => s.name);
  const scores = suppliers.map(s => s.reliabilityScore);
  const deliveryTimes = suppliers.map(s => s.avgDeliveryDays * 15); // scaled for visual comparison

  chartInstances[canvasId] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Reliability Score (%)',
          data: scores,
          backgroundColor: '#6366f1',
          borderRadius: 8
        },
        {
          label: 'Fulfillment Speed Index',
          data: deliveryTimes,
          backgroundColor: '#38bdf8',
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        y: { max: 100, grid: { color: '#e2e8f0' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// 4. Sales vs Purchase Monthly Analytics Chart
export function renderSalesVsPurchaseChart(canvasId) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  chartInstances[canvasId] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct (Proj)'],
      datasets: [
        {
          label: 'Sales Revenue ($)',
          data: [42000, 48500, 51200, 59000, 64200, 71000],
          backgroundColor: '#10b981',
          borderRadius: 6
        },
        {
          label: 'Purchase Cost ($)',
          data: [28000, 31000, 34500, 39000, 26775, 32000],
          backgroundColor: '#8b5cf6',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        y: { grid: { color: '#e2e8f0' } },
        x: { grid: { display: false } }
      }
    }
  });
}
