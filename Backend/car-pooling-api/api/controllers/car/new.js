module.exports = {
    friendlyName: "New Car",
    description: "New Car",
    inputs: {
        data: {
            type: {},
            example: {
                user: "456789",
                make: "BMW",
                model: "318i",
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
            error = [],
            password = "";

        try {
            if (inputs.data && inputs.data.user && inputs.data.make && inputs.data.model && inputs.data.registration_plate && inputs.data.available_seats) {

                recordsAdded = await Car.create(inputs.data).fetch();

                return exits.success({
                    success_message: "Car Added Successfully",
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