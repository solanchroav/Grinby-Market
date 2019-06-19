const ctrl = {};

ctrl.account = (req, res) => {
    res.render('users/signup');
};

ctrl.index = (req, res) => {
    res.render('users/account-user');
};


module.exports = ctrl;
