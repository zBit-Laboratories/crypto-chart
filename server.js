import express from "express";
import request from "request";

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/price', (req, res) => {
  const { symbol } = req.query;
  const url = `https://api.blockchain.com/v3/exchange/tickers/${symbol}`;

  request(url, { json: true }, (err, apiRes, body) => {
    if (err) { return console.log(err); }
    res.send(body.last_trade_price);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
