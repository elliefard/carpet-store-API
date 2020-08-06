const express = require('express');
const itemController = require('./../controllers/itemController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, itemController.getAllItems)
  .post(itemController.createItem);
router
  .route('/:id')
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(authController.protect, authController.restrictTo('admin'), itemController.deleteItem);

module.exports = router;
