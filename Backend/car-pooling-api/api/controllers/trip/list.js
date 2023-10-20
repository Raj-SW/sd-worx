module.exports = {
    friendlyName: "List Trips for a user",
    description: "List Trips for a user",
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
            suitableTrips = [],
            thresholdKm = sails.config.appsettings.threshold_kms;

        try {
            if (inputs.data && inputs.data.date) {

                requestingUser = await User.find({
                    id: req.session.user_id
                });

                tripList = await Trip.find({
                    date: inputs.data.date
                }).populate("driver").populate("car");

                for (const trip of tripList) {
                    if (trip.available_for_carpool == "true") {

                        tripBooking = await Booking.find({
                            trip: trip.id
                        }).populate("user");

                        acceptedBookingCount = 0;
                        totalBookingCount = 0;
                        confirmedPax = [];
                        tripPath = [trip.driver.location];

                        if (tripBooking.length > 0) {
                            for (const booking of tripBooking) {
                                if (booking.status == "accepted") {
                                    acceptedBookingCount++;
                                    confirmedPax.push(booking.user)
                                }
                                totalBookingCount++;
                            }

                            if (trip.available_seats > acceptedBookingCount) {
                                for (passenger of confirmedPax) {
                                    tripPath.push(passenger.location)
                                }
                            }
                        }

                        directRouteDistance = await sails.helpers.trip.getRouteDetails(tripPath);
                        if (directRouteDistance == null) {
                            error.push(await sails.helpers.utility.error.getAppError("trip.list_error"));
                            return exits.jsonError(error);
                        }

                        routeViaUserDistance = await sails.helpers.trip.getRouteDetails([...tripPath, requestingUser[0].location]);
                        if (routeViaUserDistance == null) {
                            error.push(await sails.helpers.utility.error.getAppError("trip.list_error"));
                            return exits.jsonError(error);
                        }

                        if (routeViaUserDistance.distance - directRouteDistance.distance <= thresholdKm) {
                            pickupTimeResponse = await sails.helpers.trip.estimatePickupTime(trip.departure_time, trip.driver.location, [...confirmedPax, requestingUser[0]])
                            suitableTrips.push({
                                trip_id: trip.id,
                                driver: {
                                    id: trip.driver.id,
                                    name: trip.driver.name,
                                    address: trip.driver.address,
                                    email: trip.driver.email,
                                    phone: trip.driver.phone,
                                },
                                car: {
                                    make: trip.car.make,
                                    model: trip.car.model,
                                    registration_plate: trip.car.registration_plate,
                                },
                                passengers: confirmedPax.map(user => user.name),
                                available_seats: trip.available_seats - acceptedBookingCount,
                                price: trip.price,
                                departure_time: trip.departure_time,
                                estimated_pickup_time: pickupTimeResponse.pickup_times
                            });
                        }
                    }
                }


                return exits.success({
                    data: suitableTrips
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