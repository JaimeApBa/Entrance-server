const { Router } = require('express');
const { check } = require('express-validator');
const { getAllUsers, getDataUser, newUser, newUserAdmin, updateUser, deleteUser } = require('../controllers/dataUser');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validators } = require('../middlewares/validators');

const router = Router();

const checkValidators = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre es demasiado corto').isLength({ min: 2 }),
    check('lastname', 'Los apellidos son obligatorios').not().isEmpty(),
    check('lastname', 'Los apellidos son demasiado cortos').isLength({ min: 2 }),
    check('position', 'La posición es obligatoria').not().isEmpty(),
    check('position', 'El nombre de la posición es demasiado corto').isLength({ min: 2 }),
    validators
];

const credentialsValidators = [
    check('email', 'El correo electrónico es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico no es correcto').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña ha de ser de almenos 6 caracteres').isLength({ min: 6 }),
    validators
]

// Middleware for every route
router.use( validateJWT );

router.post('/', getAllUsers);

router.get('/:credentialsId', getDataUser);

router.delete('/:userId', deleteUser);

// Middleware for updating and new users
router.use( checkValidators );

router.post('/:credentialsId', newUserAdmin);

router.put('/:userId', updateUser);

router.post('/', credentialsValidators, newUser);

module.exports = router;