module.exports = {
    attributes: {
        driver: {
            model: "User",
            required: true
        },
        passenger: {
            model: "User",
            required: true
        },
        overall: {
            type: "number",
            required: true
        },
        safety: {
            type: "number",
            required: true
        },
        behaviour: {
            type: "number",
            required: true
        },
        punctuality: {
            type: "number",
            required: true
        },
        comments: {
            type: "string",
            required: false
        },
    },
    constants: {
    }
};
