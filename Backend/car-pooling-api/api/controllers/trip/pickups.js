module.exports = {
    friendlyName: "Pickups for a particular trips",
    description: "Pickups for a particular trips",
    inputs: {
        data: {
            type: {},
            example: {
                trip_id: "789"
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
        var axios = require('axios'),
            queryString = undefined,
            routePath = [],
            usersArray = [],
            params = {};

        try {
            if (inputs.data && inputs.data.trip_id) {

                tripList = await Trip.find({
                    date: inputs.data.trip_id
                }).populate("driver");

                routePath.push(tripList[0].driver.location);
                usersArray.push(tripList[0].driver);

                tripBooking = await Booking.find({
                    trip: inputs.data.trip_id
                }).populate("user");

                for (const booking of tripBooking) {
                    routePath.push(booking.user.location)
                    usersArray.push(booking.user);
                }

                usersArray.push({
                    coordinates: sails.config.appsettings.destination,
                    name: "sdworxs"
                })

                pickupTimes = await sails.helpers.trip.estimatePickupTime(tripList[0].departure_time, tripList[0].driver.location, [])

                queryString = routePath.map(p => `${p.coordinates[1]}`, `${p.coordinates[0]}`).join(':')
                params = {
                    'api-version': '1.0',
                    'subscription-key': sails.config.appsettings.azure_maps.subscription_key,
                    'query': queryString,
                    'travelMode': 'car'
                }

                axios.get("https://atlas.microsoft.com/route/directions/json", { params })
                    .then(response => {
                        console.log(response.data);
                        legs = response.data.routes[0].legs;
                        points = legs.flatMap(leg => leg.points);
                        routeCoords = points.map(point => [point.longitude, point.latitude])
                    })

                return exits.success({
                    success_message: "Car Added Successfully",
                    data: {
                        coordinates: routeCoords
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