const loggedIn = (req, res, next) => {
    if (req.session.profile) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = loggedIn;