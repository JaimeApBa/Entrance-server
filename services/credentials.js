const { Router } = require('express');
const { check } = require('express-validator');
const { login, signUp, renewToken, updateAdmin } = require('../controllers/credentials');
const { validators } = require('../middlewares/validators');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/login', [
    check('email', 'El correo electrónico es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico no es correcto').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña ha de ser de almenos 6 caracteres').isLength({ min: 6 }),
    validators
], login);

router.post('/signup', [
    check('email', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico no es correcto').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña ha de ser de almenos 6 caracteres').isLength({ min: 6 }),
    check('companyName', 'El nombre de la compañía es obligatorio').not().isEmpty(),
    check('companyName', 'El nombre de la compañía ha de ser de almenos 2 caracteres').isLength({ min: 2 }),
    validators
], signUp);

router.get('/renew', validateJWT, renewToken);
router.put('/updateAdmin', validateJWT, updateAdmin);

module.exports = router;