module.exports = {
    friendlyName: "Register User",
    description: "Register User",
    inputs: {
        data: {
            type: {},
            example: {
                email: "surujbhalichavi@gmail.com",
                password: "testpassword",
                name: "Chavi Surujbhali",
            }
        }
    },
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function (inputs, exits) {
        var req = this.req,
            error = [],
            password = "";

        try {
            if (inputs.data && inputs.data.email && inputs.data.password) {
                password = await sails.helpers.utility.bcrypt.hashPassword(inputs.data.password);
                inputs.data.password = password;

                recordsAdded = await User.create(inputs.data).fetch();
                delete recordsAdded.password;

                return exits.success({
                    success_message: "User Account Created",
                    user: recordsAdded
                });
            } else {
                error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));
                sails.log.debug(error); //debug
                return exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("register.js (Line: 50) : err"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.error.getAppError("general.unknown_error"));
            exits.jsonError(error);
        }
    }
};