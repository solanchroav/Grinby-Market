//Get libraries
const path = require('path');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const exphbs = require('express-handlebars');
const multer = require('multer');
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const uuid = require('uuid/v4');

const routes = require('../routes/routes')

module.exports = app => {

    //Initializations
    require('../config/passport');
    
    //Settings
    app.set('port', process.env.PORT || 3000);
    //The path.join(__dirname...) method returns the directory name of a path 
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
      defaultLayout: 'main',
      layoutsDir: path.join(app.get('views'), 'layouts'),
      partialsDir: path.join(app.get('views'), 'partials'),
      helpers: require('./helpers'),
      extname: '.hbs'
    }));
    app.set('view engine', '.hbs');
    
  
    //Middlewares
    
    app.use(morgan('dev'));

    //Help to understand the data extracted from the form
    app.use(express.urlencoded({extended: false}));

    //Image processing using Multer
    const storage = multer.diskStorage({
      destination: path.join(__dirname,'../public/upload/temp'),
      filename: (req, file, cb, filename) => {
          cb(null, uuid() + path.extname(file.originalname));
      }
  }) 
    app.use(multer({storage}).single('image'));

    app.use(express.json());
    app.use(methodOverride('_method'));
    app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    
    // Global Variables
    app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });
    
    // Static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // Routes
    routes(app);

  
    // Error Handling
    if('development' === app.get('env')) {
      app.use(errorHandler());
    }

  
    return app;




}