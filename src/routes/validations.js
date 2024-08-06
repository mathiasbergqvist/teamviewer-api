const { body, check } = require('express-validator');

const validateMongoDbId = () =>
    check('id').custom((value) => {
        if (!/^[0-9a-fA-F]{24}$/.test(value)) {
            throw new Error('Invalid ID');
        }
        return true;
    });

const validatePlayer = () => [
    body('name').isString().notEmpty(),
    body('position')
        .isIn([
            'Goalkeeper',
            'Defender',
            'Midfielder',
            'Forward',
            'Squad',
            'LeftBack',
            'RightBack',
            'CentreBack',
            'DefensiveMidfielder',
            'AttackingMidfielder',
            'LeftWinger',
            'RightWinger',
            'Striker',
            'Quarterback',
            'RunningBack',
            'WideReceiver',
            'TightEnd',
        ])
        .withMessage('Invalid value for position'),
    body('number').isNumeric(),
    body('countryUnicode').isString().notEmpty(),
];

const validateIdAndPlayer = () => [validateMongoDbId(), ...validatePlayer()];

const validateTeam = () => [
    body('name').isString().notEmpty(),
    body('stadium').isString().notEmpty(),
    body('manager').isString().notEmpty(),
    body('league').isString().notEmpty(),
    body('playerIds').optional().isArray().withMessage('playerIds must be an array'),
    body('playerIds.*').isMongoId().withMessage('playerId must be id of correct format'),
];

const validateIdAndTeam = () => [validateMongoDbId(), ...validateTeam()];

module.exports = {
    validateMongoDbId,
    validatePlayer,
    validateIdAndPlayer,
    validateTeam,
    validateIdAndTeam,
};
