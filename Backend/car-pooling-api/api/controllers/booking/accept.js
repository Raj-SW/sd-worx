module.exports = {
    friendlyName: "Driver Accepts Booking",
    description: "Driver Accepts Booking",
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
            password = "";

        try {
            if (inputs.data && inputs.data.booking_id) {

                recordsAdded = await Booking.update({
                    id: inputs.data.booking_id,
                }, {
                    status: "accepted"
                });

                return exits.success({
                    success_message: "Passenger Confirmed",
                });
            } else {
                error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));
                sails.log.debug(error); //debug
                return exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("new-car.js (Line: 50) : err"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.error.getAppError("general.unknown_error"));
            exits.jsonError(error);
        }
    }
};