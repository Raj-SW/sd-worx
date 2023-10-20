module.exports = {
    friendlyName: "List Cars",
    description: "List Cars",
    inputs: {
        data: {
            type: {},
            example: {
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
            searchCriteria = {};

        try {
            if (inputs.data) {

                carList = await Car.find({});

                return exits.success({
                    data: carList
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