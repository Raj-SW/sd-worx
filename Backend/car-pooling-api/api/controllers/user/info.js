module.exports = {
    friendlyName: "Get user info",
    description: "Get user info",
    inputs: {
        data: {
            type: {}
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
            searchCriteria = {};

        try {
            if (req.headers.authorization) {

                userList = await User.find({ id: req.session.user_id });
                delete userList[0].password;

                tripList = await Trip.find({ driver: req.session.user_id });
                userList[0].driver = false;

                if (tripList.length > 0) {
                    userList[0].driver = true;
                }

                if (inputs.data.include_cars) {
                    userList[0].cars = carList;
                }

                return exits.success({
                    data: userList[0]
                })

            } else {
                error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));
                exits.jsonError(error);
            }

        } catch (err) {
            sails.log.debug("get-info.js (Line: 50) : err"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.error.getAppError("general.unknown_error"));
            exits.jsonError(error);
        }
    }
};