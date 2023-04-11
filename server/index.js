const express = require("express");
import * as secp from 'ethereum-cryptography/secp256k1';

const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04dcab92434278efb65a49c223d54476769c13e82c2636e48ed61a88379417a1ce67e4a341ae19b1a4970466745c87a6732a90838ed90306afb7107499f3658a6b": 100,
  "0415946b510dc13a69f71f5e967f17a97f7bec6aa80369f6160467499f0d83e869551ddd0d4f784bcf9af23ed119ef8fa81a2e9dd2d55c96f8efcf604638d2a5f1": 50,
  "0406c1dca52505bcdff75fdd7ba11cbb97d692c70da0807507f250c8b501f01128ccfadcaa1c0815bf7343fbff938d3f36a2a32185cb46b2b96787361d169a006e": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, messageHash } = req.body;
  const recoverPublicKey = secp.recoverPublicKey(messageHash, signature, 1);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
