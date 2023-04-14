const loggedIn = (req, res, next) => {
    if (req.session.userid) {
        next();
    } else {
        const errorMessage = encodeURIComponent('You need to be logged in to access this page.');
        res.redirect(`/login?status=ERROR&message=${errorMessage}`);
    }
};

module.exports = loggedIn;