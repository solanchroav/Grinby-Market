const path = require('path');
const { unlink } = require('fs-extra');

// Models
const {Image, Member} = require('../models');

const ctrl = {};

ctrl.entry = (req, res) => {
    res.render('members/account-member');
};

ctrl.upload = async (req, res) => {
    res.render('members/upload-products');
};

ctrl.index = async (req, res) => {
     const images  = await Image.find({member: req.user.id}).sort({date: 'desc'});
    res.render('members/store', { images });
};


ctrl.imgs = async (req, res) => {
    const { id} = req.params;
    const image = await Image.findById(id);
    console.log(image);
    res.render('members/img/selected-img', { image });
 };


ctrl.delete = async (req, res) => {
    const { id} = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src' + imageDeleted.path));
    res.redirect('/members/store');
};

ctrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/');
  };


module.exports = ctrl;

//Reference for the future

 /*  const { id } = req.params;
      console.log(id);
     const images  = await Image.find({ comerce_id: id });*/