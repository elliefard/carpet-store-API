const fs = require('fs');

const items = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/items.json`)
);

exports.getAllItems = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: items.length,
    data: {
      items,
    },
  });
};

exports.getItem = (req, res) => {
  const id = req.params.id * 1;

  if (id > items.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  const item = items.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
};

exports.createItem = (req, res) => {
  const newId = items[items.length - 1].id + 1;
  const newItem = Object.assign({ id: newId }, req.body);

  items.push(newItem);

  fs.writeFile(
    `${__dirname}/dev-data/data/items.json`,
    JSON.stringify(items),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          item: newItem,
        },
      });
    }
  );
};

exports.updateItem = (req, res) => {
  if (req.params.id * 1 > items.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(201).json({
    status: 'success',
    data: {
      tour: '<updated tour>',
    },
  });
};

exports.deleteItem = (req, res) => {
  if (req.params.id * 1 > items.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(204).json({
    status: 'success',
    message: 'item deleted',
    data: null,
  });
};
