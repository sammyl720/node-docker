const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h2>Hi There<h2>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});