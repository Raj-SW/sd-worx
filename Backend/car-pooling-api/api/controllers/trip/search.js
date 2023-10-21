module.exports = {
    friendlyName: "List Trips for a driver",
    description: "List Trips for a driver",
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

                tripList = await Trip.find({
                    driver: inputs.data.driver_id
                }).populate("driver");

                bookingList = await Booking.find({
                    trip: tripList[0].id
                }).populate("user");

                tripList[0].passengers = bookingList.map(user => user.name);

                delete tripList[0].driver.password

                return exits.success({
                    data: tripList
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