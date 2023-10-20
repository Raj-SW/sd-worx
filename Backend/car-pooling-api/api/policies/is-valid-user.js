module.exports = async function (req, res, proceed) {
    var token = "",
        response = {},
        error = [];

    if (req.headers && req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '');
        response = await sails.helpers.user.verifyToken(token, req);
        if (response.valid && response.user_id) {
            req.session.user_id = response.user_id
            req.session.email = response.email
            return proceed();
        } else {
            res.status(401);
            error.push(await sails.helpers.utility.error.getAppError("auth.invalid_header_token"))
            return res.json({
                success: false,
                error: error
            });
        }
    } else {
        res.status(400);
        if (req.method == "POST") {
            error.push(await sails.helpers.utility.error.getAppError("auth.incorrect_header_token"))
            return res.json({
                success: false,
                error: error
            });
        } else {
            return res.redirect("/");
        }
    }
};