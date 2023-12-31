module.exports = {
    attributes: {
        driver: {
            model: "User",
            required: true
        },
        car: {
            model: "Car",
            required: false
        },
        parking_booking: {
            model: "ParkingBooking",
            required: false
        },
        date: {
            // YYYY-MM-DD
            type: "string",
            required: true
        },
        departure_time: {
            type: "string",
            required: true
        },
        departure_location_lat: {
            type: "number",
            required: false
        },
        departure_location_long: {
            type: "number",
            required: false
        },
        available_for_carpool: {
            type: "string",
            required: true
        },
        available_seats: {
            type: "number",
            required: true
        },
        recurring_trip: {
            type: "boolean",
            defaultsTo: false
        },
        status: {
            type: "string",
            defaultsTo: "pending"
        },
        price: {
            type: "number",
            required: false
        }
    },
    constants: {
        status: {
            pending: "pending",
            completed: "completed",
            ongoing: "ongoing",
            canceled: "canceled",
        }
    }
};
