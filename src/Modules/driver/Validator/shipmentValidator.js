const { body } = require("express-validator");

exports.createShipmentValidator = [
  body("sender")
    .notEmpty().withMessage("Sender is required")
    .isString().withMessage("Sender must be a string"),

  body("receiver")
    .notEmpty().withMessage("Receiver is required")
    .isString().withMessage("Receiver must be a string"),

  body("pickupAddress")
    .notEmpty().withMessage("Pickup address is required")
    .isString().withMessage("Pickup address must be a string"),

  body("deliveryAddress")
    .notEmpty().withMessage("Delivery address is required")
    .isString().withMessage("Delivery address must be a string"),
];