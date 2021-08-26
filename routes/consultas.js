const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { clientesGet, ordenesGet, ordenesNowGet } = require('../controllers/consultas');

const router = Router();

router.get('/', clientesGet );

router.get('/ordenes/:stamp', 
            [
            check('stamp', 'La fecha es obligatorio').not().isEmpty(),
            check('stamp', 'El campo fecha debe ser numerico').isNumeric(),
            check('stamp', 'El campo fecha debe tener al menos 12 digitos').isLength({ min: 10 })
            ], 
            validarCampos,
            ordenesGet );

router.get('/ordenesnow/:cliente', 
            [
            check('cliente', 'La cliente es obligatorio').not().isEmpty(),
            check('cliente', 'El campo cliente debe ser numerico').isNumeric()
            ], 
            validarCampos, 
            ordenesNowGet );

module.exports = router;