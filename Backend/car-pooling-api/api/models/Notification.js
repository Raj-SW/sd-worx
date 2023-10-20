module.exports = {
    attributes: {
        user: {
            model: "User",
            required: true
        },
        content: {
            type: "string",
            required: true
        },
        trip: {
            model: "Trip",
            required: false
        },
        role: {
            type: "string",
            defaultsTo: "other"
        }
    },
    constants: {
        role: {
            driver: "driver",
            passenger: "passenger",
            other: "other",
        }
    }
};
