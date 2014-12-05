exports.userAuthFilter = function(req, res, next){
    if (req.url == "/signup" ||
        req.url == "/login" ||
        req.url == "/oauth" ||
        req.url == "/product/detail/IJ45014z98" ||
        req.url.match("/api/") != null ||
        req.url.match("/public/") != null ||
        req.url.match("/error/") != null ||
        req.url.match("/js/") != null ||
        req.url.match("/images/") != null ||
        req.url.match("/css/") != null ||
        req.url.match("/pics/") != null ||
        req.url.match("/ajax/") != null ||
        req.url.match("/favicon.ico") != null ||
        req.url.match("/logout") != null) {
        next();
    } else if (req.session == null ||  req.session.userInfo == null ||
        req.session.userInfo == "") {
        res.redirect("/oauth");
    } else {
        next();
    }
};