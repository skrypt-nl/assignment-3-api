// This file provides a middleware to check if the user is an anonymous user

const isGuest = (req, res, next) => {
    if (!req.session.userid) {
        next();
    } else {
        res.redirect(`/group42/account`);
    }
};

module.exports = isGuest;