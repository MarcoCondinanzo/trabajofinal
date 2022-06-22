const express = require('express');
const userController = require('../../controllers/userController');
const userRouter = express.Router();
const path = require('path');
const multer = require('multer');
const {check} =  require('express-validator');

const storage = multer.diskStorage({
    // Carpeta destino del archivo
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/images/users'));
    },
    filename: function (req, file, cb) {
        // Nombre del archivo
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage });

//ruta principal que muestra listado de users
userRouter.get('/', userController.listar);

//ruta get para edicion de user
userRouter.get('/editar/:id', userController.editar);

//ruta post para enviar el user editado
userRouter.post('/modificar/:id', upload.single("imagen"), userController.modificar); 

//ruta get para crear user 
userRouter.get('/crear', userController.crear); 

//ruta post para enviar el user creado
userRouter.post('/almacenar', upload.single("imagen"), userController.almacenar); 

//ruta post para eliminar user 
userRouter.post('/eliminar/:id', userController.eliminar); 

//ruta para detalle de user
userRouter.get('detalle/:id', userController.detalle); 

const ValidationRegister = [
    check('nombre', 'El nombre es requerido').notEmpty().isLength({min: 2}).withMessage('El Nombre debe tener mínimo 2 caracteres'),
    check('apellido', 'El apellido es requerido').notEmpty().isLength({min: 2}).withMessage('El Apellido debe tener mínimo 2 caracteres'),
    check('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('El email no tiene un formato válido'),
    check('pwd').notEmpty().withMessage('La contraseña es requerida').isLength({min: 8}).withMessage('La contraseña debe tener mínimo 8 caracteres'),
    check('confirmarPassword').notEmpty().withMessage('Debe confirmar la contraseña').custom((value, {req}) => (value === req.body.pwd)).withMessage('Las contraseñas no coinciden'),
]

module.exports=userRouter; 