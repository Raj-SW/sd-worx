module.exports = {
    friendlyName: "Check if token is valid",
    description: "Check if token is valid",
    inputs: {
        token: {
            type: "string",
            required: true
        },
        req: {
            type: "ref",
            required: true
        }
    },

    fn: async function (inputs, exits) {
        var req = inputs.req,
            jwt = require("jsonwebtoken"),
            secret = sails.config.user.jwt.secret;

        try {
            jwt.verify(inputs.token, secret, async (err, decoded) => {
                if (err) {
                    return exits.success({
                        valid: false,
                    });
                }

                if (decoded.iat && decoded.id) {
                    userList = await User.find({
                        id: decoded.id
                    });


                    if (userList && userList[0]) {
                        return exits.success({
                            valid: true,
                            title: decoded.title,
                            user_id: userList[0].id,
                            email: userList[0].email,
                        });
                    }


                    return exits.success({
                        valid: false,
                    });
                }
                return exits.success({
                    valid: false
                });
            })
        } catch (err) {
            sails.log.debug("verfy-token.js (Line: 24) : err"); //debug
            sails.log.debug(err); //debug

            exits.success(false);
        }

    }
};