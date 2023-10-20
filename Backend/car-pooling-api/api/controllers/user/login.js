module.exports = {
    friendlyName: "User Login",
    description: "User Login",
    inputs: {
        data: {
            type: {},
            example: {
                email: "surujbhalichavi@gmail.com",
                password: "testpassword"
            }
        },
        auth: {
            type: {},
            example: {
                app_token: ""
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
        var error = [],
            validPassword = false,
            searchCriteria = {},
            loginToken = "";

        try {
            if (inputs.data) {

                // check if user already exists
                searchCriteria = {
                    email: inputs.data.email.toLowerCase()
                };

                userList = await User.find(searchCriteria);

                if (userList.length > 0) {
                    validPassword = await sails.helpers.utility.bcrypt.comparePassword(inputs.data.password, userList[0].password);

                    if (validPassword) {

                        loginToken = await sails.helpers.user.generateLoginToken(userList[0].id, userList[0].email);

                        return exits.success({
                            success_message: "Login Successful",
                            data: {
                                login_token: loginToken
                            }
                        });
                    } else {
                        error.push(await sails.helpers.utility.error.getAppError("user.invalid_login_password"));
                        exits.jsonError(error);
                    }
                } else {
                    error.push(await sails.helpers.utility.error.getAppError("user.invalid_credentials"));
                    exits.jsonError(error);
                }

            } else {
                error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));
                exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("login.js (Line: 92) : err"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.error.getAppError("general.unknown_error"));
            exits.jsonError(error);
        }
    }
};