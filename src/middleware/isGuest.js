// This file provides a middleware to check if the user is an anonymous user

const isGuest = (req, res, next) => {
    if (!req.session.userid) {
        next();
    } else {
        res.redirect(`/account`);
    }
};

module.exports = isGuest;