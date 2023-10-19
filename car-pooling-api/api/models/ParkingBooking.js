module.exports = {
    attributes: {
        user: {
            model: "User",
            required: true
        },
        parking: {
            model: "Parking",
            required: true
        },
        start_time: {
            type: "string",
            required: true
        },
        end_time: {
            type: "boolean",
            required: true
        },
        status: {
            type: "string",
            defaultsTo: "reserved"
        },
        recurring_booking: {
            type: "boolean",
            defaultsTo: false
        },
    },
    constants: {
        status: {
            reserved: "reserved",
            canceled: "canceled",
        }
    }
};
