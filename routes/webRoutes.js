const express = require('express');

const webRouter = express.Router(); 
const MainController = require('../controllers/mainController'); 

webRouter.get('/about', MainController.about);
webRouter.get('/*', MainController.notFound); 




module.exports= webRouter; 