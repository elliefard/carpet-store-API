const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());
const items = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/items.json`));

app.get('/api/v1/items', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

app.post('/api/v1/items', (req, res) => {
  //   console.log(req.body);
  const newId = items[items.length - 1].id + 1;
  const newItem = Object.assign({ id: newId }, req.body);

  items.push(newItem);
  fs.writeFile(`${__dirname}/dev-data/data/items.json`, JSON.stringify(items), (err) => {
    res.status(201).json({
      status: 'success',
      results: items.length,
      data: {
        item: newItem,
      },
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port} ...`);
});
