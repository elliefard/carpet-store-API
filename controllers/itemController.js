const Item = require('./../models/itemModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllItems = catchAsync(async (req, res) => {
  const features = new APIFeatures(Item.find(), req.query).filter().sort().limitFields().paginate();
  const items = await features.query;

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

exports.getItem = catchAsync(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!iteem) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

exports.createItem = catchAsync(async (req, res) => {
  const newItem = await Item.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      item: newItem,
    },
  });
});

exports.updateItem = catchAsync(async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
