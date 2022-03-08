const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

function yearsLater(number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + number);
  return date.toLocaleDateString();
}

let products = [
  {
    id: 1,
    name: 'TV',
    price: '1000',
    weight: 6,
    startDate: new Date().toLocaleDateString(),
    endDate: yearsLater(3),
    number: 10,
  },
  {
    id: 2,
    name: 'mic',
    price: '100',
    weight: 1,
    startDate: new Date().toLocaleDateString(),
    endDate: yearsLater(1),
    number: 50,
  },
  {
    id: 3,
    name: 'laptop Acer',
    price: '900',
    weight: 2,
    startDate: new Date().toLocaleDateString(),
    endDate: yearsLater(1),
    number: 20,
  },
];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // I intentinally use double equal instead of triple equals, becuase of it's coercion
  // if you want to know more ask me to describe it better
  if (email == 'aco@gmail.com' && password == '123') {
    return res.status(200).json({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    });
  }
  return res.status(401).jsonp({ error: 'user not found' });
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/product', (req, res) => {
  try {
    products.push({ id: products.length + 1, ...req.body });
    res.status(201).json(req.body);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
