const isGuest = (req, res, next) => {
    if (!req.session.userid) {
        next();
    } else {
        res.redirect(`/account`);
    }
};

module.exports = isGuest;