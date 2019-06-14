const express = require('express');
const router = express.Router();
const passport = require('passport');
const md5 = require('md5');


// Controllers
const home = require('../controllers/home');
const image = require('../controllers/image');
const user = require('../controllers/user');
const stores = require('../controllers/store');
const contact = require('../controllers/contact');
const commerce = require('../stores/agroRobots');


// Models
const { Data, Image, Member, Users } = require('../models');


module.exports = app => {

  router.get('/', home.index);
  router.get('/products', image.index);
  router.get('/contact', contact.index);
  router.get('/users/signup', user.account);
  router.get('/members/account-member', stores.entry);
  router.get('/members/upload-products', stores.upload);
  router.get('/members/store', stores.index);
  router.get('/members/img/:id', stores.imgs);
  router.get('/members/img/:id/delete', stores.delete);
  router.get('/members/logout', stores.logout);
  router.get('/storeView/agroRobots', commerce.index);

  //Post USER SIGN-UP

  router.post('/users/signup', async (req, res) => {
    let errors = [];
    const { name, lastname, email, password, confirm_password } = req.body;
    if(name.length <= 0) {
      errors.push({text: 'Escribe tu nombre.'});
    }
    if(lastname.length <= 0) {
      errors.push({text: 'Escribe tu apellido.'});
    }
    if(password != confirm_password) {
      errors.push({text: 'Las contraseñas no coinciden.'});
    }
    if(password.length < 8) {
      errors.push({text: 'La contraseña debe tener al menos 8 caracteres.'})
    }
    if(errors.length > 0){
      res.render('users/signup', {errors, name, lastname, email, password, confirm_password});
    } else {
      // Looking for email coincidence.
      const emailUser = await Users.findOne({email: email});
      if(emailUser) {
        req.flash('error_msg', 'The Email is already in use.');
        res.redirect('/users/signup');
      }
    else {
      //Create new user.
      const newUser = new Users({name, lastname, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered.');
      res.redirect('/users/signin');
    }
  }
  });

 
  
  //Post CONTACT

  router.post('/contact', async (req, res) => {
    const { nombre, apellido, email, telefono, descripcion } = req.body;
  const errors = [];
  if (!nombre) {
    errors.push({text: 'Por favor inserte su nombre'});
  }
  if (!apellido) {
    errors.push({text: 'Por favor inserte su apellido'});
  }
  if (!email) {
    errors.push({text: 'Por favor inserte su email'});
  }
  if (!telefono) {
    errors.push({text: 'Por favor inserte su telefono'});
  }
  if (!descripcion) {
    errors.push({text: 'Por favor comentanos tus dudas y preguntas'});
  }
  if (errors.length > 0) {
    res.render('contact', {
      // View the content that was loaded by the user
      errors,
      nombre,
      apellido,
      email,
      telefono,
      descripcion
    });
  } else {
    const newData = new Data({nombre, apellido, email, telefono, descripcion});
    await newData.save();
    res.redirect('/');
  }
   
  });

  //Post MEMBERS FORM APLICATION

  
  router.post('/members/account-member', async (req, res) => {
    const {brand_name, first_name, last_name, job_title, password, password_confirmation, email_confirmation, email, phone, website, gravatar, products} = req.body;
  const errors = [];
  if (!first_name) {
    errors.push({text: 'Por favor inserte su nombre'});
  }
  if (!last_name) {
    errors.push({text: 'Por favor inserte su apellido'});
  }
  if (!email) {
    errors.push({text: 'Por favor inserte su email'});
  }
  if (!phone) {
    errors.push({text: 'Por favor inserte su telefono'});
  }
  if (!brand_name) {
    errors.push({text: 'Por favor inserte el nombre del negocio'});
  }
  if (!job_title) {
    errors.push({text: 'Por favor inserte su empleo'});
  }
  if(password != password_confirmation) {
    errors.push({text: 'Las contraseñas no coinciden.'});
  }
  if(password.length < 8) {
    errors.push({text: 'La contraseña debe tener al menos 8 caracteres.'})
  }
  if(email != email_confirmation) {
    errors.push({text: 'Las contraseñas no coinciden.'});
  }
  if (errors.length > 0) {
    res.render('/members/account-member', {
      // View the content that was loaded by the user
      errors,
      brand_name, 
      first_name,
      last_name,
      job_title,
      password,
      password_confirmation, 
      email_confirmation, 
      email, 
      phone
      
    });
  } else {
    const newMember = new Member({brand_name, first_name, last_name, job_title, website, gravatar, email, phone, password});
    newMember.password = await newMember.encryptPassword(password);
    newMember.gravatar = md5(newMember.email); 
    await newMember.save();
    req.flash('success_msg', 'You are registered.');
    res.redirect('/members/account-member');
  }

});

//Post MEMBER SIGN-IN

router.post('/members/recicle', passport.authenticate('local',
{
successRedirect: '/members/store',
failureRedirect: '/products',
failureFlash: true
})  );


//Post MEMBER UPLOAD PRODUCTS

/*console.log(req.file);
console.log(req.body);*/



router.post('/members/upload-products', async (req, res) => {

     const image = new Image()
     image.member = req.user.id; 
     const id = image.member.toString()
     const brand = await Member.findById(id);
     console.log(brand);
     image.brand = brand.brand_name;
     image.title = req.body.title;
     image.description = req.body.description;
     image.price = req.body.price;
     image.filename = req.file.filename;
     image.path = '/public/upload/temp/' + req.file.filename;
     image.originalname = req.file.originalname;
     image.mimetype = req.file.mimetype;
     image.size = req.file.size;
   
    
    await image.save();
    req.flash('success_msg', 'Producto enlistado exitosamente');
    res.redirect('/members/store');
  

});




  app.use(router);

};