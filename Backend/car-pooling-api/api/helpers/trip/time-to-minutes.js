module.exports = {
    friendlyName: "Time to Minutes",
    description: "Time to Minutes",
    inputs: {
        time: {
            type: "string",
            example: "",
            required: true
        },
    },

    fn: async function (inputs, exits) {
        try {
            const [hours, minutes] = inputs.time.split(':').map(Number);

            return exits.success({
                minutes: hours * 60 + minutes
            });
        } catch (err) {
            sails.log.debug("get-route-details.js (Line: 24) : err"); //debug
            sails.log.debug(err); //debug

            return exits.success(null);
        }
    }
};