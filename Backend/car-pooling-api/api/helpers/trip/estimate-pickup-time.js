module.exports = {
    friendlyName: "Estimate Pickup Time for the User",
    description: "Estimate Pickup Time for the User",
    inputs: {
        departure_time: {
            type: "string",
            example: "",
            required: true
        },
        driver_location: {
            type: "ref",
            required: true
        },
        passengers: {
            type: ['ref'],
            required: true
        },
        passenger_name: {
            type: "string",
            required: false
        },
    },

    fn: async function (inputs, exits) {
        try {
            var routePoints = [inputs.driver_location],
                currentLeaveTimeResponse = await sails.helpers.trip.timeToMinutes(inputs.departure_time),
                currentLeaveTime = currentLeaveTimeResponse.minutes,
                pickupTimesArray = [],
                pickupTimes = {};

            for (const passenger of inputs.passengers) {
                routeToPassengerDetails = await sails.helpers.trip.getRouteDetails([...routePoints, passenger.location]);

                duration = currentLeaveTime + routeToPassengerDetails.time;
                timeConversionResponse = await sails.helpers.trip.minutesToTime(duration);
                pickupTimes[passenger.name] = timeConversionResponse.time;
                pickupTimesArray.push(timeConversionResponse.time);
                routePoints.push(passenger.location);
                if (inputs.passenger_name == passenger.name) {
                    return exits.success({
                        pickup_time: timeConversionResponse.time
                    });
                }
            }



            return exits.success({
                pickup_time: pickupTimes
            });
        } catch (err) {
            sails.log.debug("estimate-pickup-time.js (Line: 24) : err"); //debug
            sails.log.debug(err); //debug

            return exits.success(null);
        }
    }
};