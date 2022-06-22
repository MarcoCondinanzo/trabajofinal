const bcrypt = require('bcrypt');
const multer = require('multer');
const db = require('../database/models/index');

const userController = {
    editar:  function (req,res){
        const id = req.params.id
        db.Usuario.findByPk(id)
            .then(usuario=>{
                if(usuario){
                    res.render('user/edit', { usuario });
                } else {
                    res.redirect('/');
                }
            })
    }, 
    modificar:  function (req,res){
        const id = req.params.id
        const usuarioEditado = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email         
        };
        if(req.file.filename){
            usuarioEditado.image = req.file.filename;
        } 
        if(req.body.pwd) {
            usuarioEditado.pwd = req.body.pwd;
        }
        db.Usuario.update(usuarioEditado, { where:{ id:id } } )
            .then(()=>{
                res.redirect('/');
            })
    }, 
    crear:  function (req,res){
        res.render('user/create'); 
    },  

    almacenar: function (req,res) {
        
        const nuevoUsuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            pwd: bcrypt.hashSync(req.body.pwd, 10),
            image: req.file.filename
        };
        db.Usuario.create(nuevoUsuario)
            .then(()=>{
                res.redirect('/');
            })
    }, 
    eliminar:  function (req,res){
        const id = req.params.id
        db.Usuario.destroy( { where: { id: id } } )
        .then(()=>{
            res.redirect('/');
        }) 
    }, 

    detalle:  function (req,res){
        const id = req.params.id
        db.Usuario.findByPk(id)
            .then(usuario=>{
                res.render('user/detail', { usuario });
            })
    }, 
    listar: function (req,res){
        db.Usuario.findAll()
        .then(usuarios=>{
            res.render('index', { usuarios }); 
        })
    }
}

module.exports = userController; 

