module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true
        },
        email: {
            type: "string",
            required: true
        },
        password: {
            type: "string",
            required: true
        },
        phone: {
            type: "string",
            required: true
        },
        location: {
            type: "json",
            required: true
        },
        address: {
            type: "string",
            required: true
        }
    },
    constants: {
    }
};
