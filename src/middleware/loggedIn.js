// This file provides a middleware to check if the user is a registered user

const loggedIn = (req, res, next) => {
    if (req.session.userid) {
        next();
    } else {
        const errorMessage = encodeURIComponent('You need to be logged in to access this page.');
        const nextUrl = encodeURIComponent(req.originalUrl);
        res.redirect(`/group42/login?status=ERROR&message=${errorMessage}&from=${nextUrl}`);
    }
};

module.exports = loggedIn;