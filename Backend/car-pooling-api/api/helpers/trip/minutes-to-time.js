module.exports = {
    friendlyName: "Minutes to Time",
    description: "Minutes to Time",
    inputs: {
        minutes: {
            type: "number",
            example: 152,
            required: true
        },
    },

    fn: async function (inputs, exits) {
        try {
            var hours = Math.floor(inputs.minutes / 60) % 24,
                mins = Math.round(inputs.minutes % 60);

            if (mins === 60) {
                mins = 0;
                hours = (hours + 1) % 24;
            }

            return exits.success({
                time: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
            });
        } catch (err) {
            sails.log.debug("get-route-details.js (Line: 24) : err"); //debug
            sails.log.debug(err); //debug

            return exits.success(null);
        }
    }
};