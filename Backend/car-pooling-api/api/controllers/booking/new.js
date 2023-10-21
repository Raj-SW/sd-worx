module.exports = {
    friendlyName: "New Booking",
    description: "New Booking",
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
            if (inputs.data && inputs.data.trip) {

                recordsAdded = await Booking.create({
                    user: req.session.user_id,
                    trip: inputs.data.trip,
                    status: "accepted"

                }).fetch();

                return exits.success({
                    success_message: "Trip Booked",
                    data: {
                        recordsAdded
                    }
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