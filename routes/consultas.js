const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {  getServiciosRondines, 
         ordenesNowStructure, 
         clientesGet, 
         ordenesGet, 
         ordenesNowGet,
         positionGet, 
         distanciePosition, 
         ordenesAllNow 
        } = require('../controllers/consultas');

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

router.get('/rondines/:cliente/:estructura', 
            [
            check('cliente', 'La cliente es obligatorio').not().isEmpty(),
            check('cliente', 'El campo cliente debe ser numerico').isNumeric(),
            check('estructura', 'La campo estructura es obligatorio').not().isEmpty(),
            check('estructura', 'El campo estructura debe ser numerico').isNumeric()
            ], 
            validarCampos, 
            getServiciosRondines);

router.get('/ordenestr/:cliente/:estructura', 
            [
            check('cliente', 'La cliente es obligatorio').not().isEmpty(),
            check('cliente', 'El campo cliente debe ser numerico').isNumeric(),
            check('estructura', 'La campo estructura es obligatorio').not().isEmpty(),
            check('estructura', 'El campo estructura debe ser numerico').isNumeric()
            ], 
            validarCampos, 
            ordenesNowStructure);

router.get('/ordenesall', ordenesAllNow );

router.get('/position/:interno', 
            [
            check('interno', 'El interno es obligatorio').not().isEmpty(),
            check('interno', 'El campo interno debe ser numerico').isNumeric()
            ], 
            validarCampos, 
            positionGet );

router.post('/distance',
            distanciePosition );

module.exports = router;