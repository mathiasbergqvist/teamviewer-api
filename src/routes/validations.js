const { body, check, validationResult } = require("express-validator");

const validateMongoDbId = () => check('id').custom((value) => {
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new Error('Invalid ID');
    }
    return true;
});

module.exports = {
    validateMongoDbId,
};