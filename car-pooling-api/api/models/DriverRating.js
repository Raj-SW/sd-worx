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
        driving: {
            type: "number",
            required: true
        },
        music: {
            type: "number",
            required: true
        },
        personality: {
            type: "number",
            required: true
        },
        punctionality: {
            type: "number",
            required: true
        },
        safety: {
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
