module.exports = {
    friendlyName: "List Bookings by Trip",
    description: "List Bookings by Trip",
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
            if (inputs.data && inputs.data.trip_id) {

                bookingList = await Booking.find({
                    trip: inputs.data.trip_id
                }).populate("trip");

                return exits.success({
                    data: bookingList
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