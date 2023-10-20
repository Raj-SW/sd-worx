module.exports = {
    friendlyName: "Generates a login token for a user",
    description: "Generates a login token for a user",
    inputs: {
        user_id: {
            type: "string",
            example: "654321",
            required: true
        },
        email: {
            type: "string",
            example: "chavi@zunko.app",
            required: true
        },
    },

    fn: async function (inputs, exits) {
        var jwt = require("jsonwebtoken"),
            secret = sails.config.user.jwt.secret,
            expirationTime = sails.config.user.jwt.token_expiry,
            token = "";

        token = jwt.sign({
            title: "access",
            id: inputs.user_id,
            email: inputs.email
        }, secret, {
            expiresIn: expirationTime
        })

        return exits.success(token);
    }
};