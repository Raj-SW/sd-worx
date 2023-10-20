module.exports = {
    friendlyName: "New Trip",
    description: "New Trip",
    inputs: {
        data: {
            type: {},
            example: {
                driver: "456789",
                car: "987654",
                parking_booking: "654654",
                registration_plate: "120 JN 01",
                available_seats: 4
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
            error = [];

        try {
            if (inputs.data) {

                recordsAdded = await Trip.create(inputs.data).fetch();

                return exits.success({
                    success_message: "Car Added Successfully",
                    data: recordsAdded
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