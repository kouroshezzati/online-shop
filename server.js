const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
