const { body, check, validationResult } = require("express-validator");

const validateMongoDbId = () => check('id').custom((value) => {
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new Error('Invalid ID');
    }
    return true;
});

const validatePlayer = () => [
  body('name').isString().notEmpty(),
  body('position').isIn(['goalkeeper', 'defender', 'midfielder', 'forward']).withMessage('Invalid value for position'),
  body('number').isNumeric(),
  body('league').isString().notEmpty(),
  body('countryUnicode').isString().notEmpty(),
];

const validateIdAndPlayer = () => [
  validateMongoDbId(),
  ...validatePlayer(),
];

module.exports = {
    validateMongoDbId,
    validatePlayer,
    validateIdAndPlayer,
};