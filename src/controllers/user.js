const ctrl = {};

ctrl.account = (req, res) => {
    res.render('users/signup');
};

ctrl.index = (req, res) => {
    res.render('users/account-user');
};

ctrl.error = (req, res) => {
    res.render('error');
}

module.exports = ctrl;
