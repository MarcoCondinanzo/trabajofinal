const fs = require('fs');
const path = require('path');
//const db = require('../database/models');

const MainController = {
    index:  function (req,res){
        res.render('user/pruebas');
    },

    about:  function (req,res){
        res.render('about');
    },

    notFound:  function (req,res){
        res.render('notFound'); 
    }
};


module.exports = MainController; 