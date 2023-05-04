
import express from "express";
import fetch from "node-fetch";
import "chart.js";

const app = express();
const port = 3000;

const API_KEY = 'YOUR_API_KEY';
const CURRENCY = 'BTC';
const INTERVAL = '1h';
const LIMIT = 24;

const fetchData = async () => {
  const response = await fetch(`https://api.blockchain.com/v3/exchange/tickers/${CURRENCY}-USD?interval=${INTERVAL}&limit=${LIMIT}`);
  const data = await response.json();
  return data;
};

const createChart = (data) => {
  const prices = data.tickers.map((tick) => tick.last_price);
  const labels = data.tickers.map((tick) => tick.timestamp);

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
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

app.get('/', async (req, res) => {
  const data = await fetchData();
  const chart = createChart(data);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Cryptocurrency Live Chart</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <canvas id="myChart"></canvas>
      </body>
      <script>${chart}</script>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
