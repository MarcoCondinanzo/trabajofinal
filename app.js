const express = require('express');
const app = express(); 
const webRouter = require('./routes/webRoutes');
const methodOverride = require('method-override');
const path = require('path');
const userRouter = require('./routes/users/userRoutes');
const bcrypt = require('bcrypt');


app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded( { extended: true }));


app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.use('/', userRouter);
app.use('/', webRouter); 



app.listen(3000, (req, res) =>{
    console.log('servidor corriendo')
}); 
