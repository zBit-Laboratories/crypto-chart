const API_KEY = 'YOUR_API_KEY';
const CURRENCY = 'BTC';
const INTERVAL = '1h';
const LIMIT = 24;

const fetchData = async () => {
  const response = await fetch(`https://api.blockchain.com/v3/exchange/tickers/${CURRENCY}-USD?interval=${INTERVAL}&limit=${LIMIT}`, {
    headers: {
      'X-API-Key': API_KEY
    }
  });
  const data = await response.json();
  return data;
};

const createChart = (data) => {
  const prices = data.tickers.map((tick) => tick.last_price);
  const labels = data.tickers.map((tick) => tick.timestamp);

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${CURRENCY}-USD`,
        data: prices,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

const updateChart = async () => {
  const data = await fetchData();
  createChart(data);
};

updateChart();
setInterval(updateChart, 1000 * 60 * 60); // Update the chart every hour
