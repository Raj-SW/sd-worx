module.exports = {
    attributes: {
        user: {
            model: "User",
            required: true
        },
        trip: {
            model: "Trip",
            required: true
        },
        status: {
            type: "string",
            defaultsTo: "pending"
        },
        recurring_booking: {
            type: "boolean",
            defaultsTo: false
        },
    },
    constants: {
        status: {
            pending: "pending",
            accepted: "accepted",
            rejected: "rejected",
        }
    }
};
