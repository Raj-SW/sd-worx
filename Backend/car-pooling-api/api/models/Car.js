module.exports = {
    attributes: {
        user: {
            model: "User",
            required: true
        },
        make: {
            type: "string",
            required: true
        },
        model: {
            type: "string",
            required: true
        },
        registration_plate: {
            type: "string",
            required: true
        },
        available_seats: {
            type: "number",
            required: true
        },
    },
    constants: {
    }
};
