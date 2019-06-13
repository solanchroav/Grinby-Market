const {Image, Member} = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
    const store = await Image.find({brand: 'AgroRobots'}).sort({date: 'desc'});
   res.render('storeView/agroRobots', { store });
};

module.exports = ctrl;