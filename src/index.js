const express = require('express');
const config = require('./server/config');

const errorHandling = (req,res,next) => {
  let error = new Error();
  let locals = {
      title: 'Error 404',
      description: 'Recurso no encontrado',
      error: error
  }

  error.status = 404;
  
  res.render('error', locals);
  next();
}


//Initialization
const app = config(express());
const database = require('./database');



  //Server is listening 
app.listen(app.get('port'), () => {
  console.log('Server on Port', app.get('port'));
})


//app.use(errorHandling);