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
            returnList = [],
            bookingList = [];

        try {
            if (inputs.data) {

                if (inputs.data.trip_id) {
                    returnList = await Booking.find({
                        trip: inputs.data.trip_id
                    }).populate("trip");
                }

                if (inputs.data.date) {
                    bookingList = await Booking.find({
                        user: req.session.user_id
                    }).populate("trip");

                    for (const booking of bookingList) {
                        console.log(booking)
                        if (booking.trip.date == inputs.data.date) {
                            returnList.push(booking);
                        }
                    }
                }

                return exits.success({
                    data: returnList
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