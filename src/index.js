const express = require('express');
const config = require('./server/config');


//Initialization
const app = config(express());
const database = require('./database');



  //Server is listening 
app.listen(app.get('port'), () => {
  console.log('Server on Port', app.get('port'));
})

