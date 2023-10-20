module.exports = {
    friendlyName: "Retrieve Route details from Azure Maps",
    description: "Retrieve Route details from Azure Maps",
    inputs: {
        points: {
            type: "ref",
            example: [{ lat: -20.2229823929673, long: 57.516862744311645 }, { lat: -20.2229823929673, long: 57.5168627422342 }],
            required: true
        },
    },

    fn: async function (inputs, exits) {
        try {
            var axios = require('axios'),
                destination = sails.config.appsettings.destination,
                points = [...inputs.points, destination],
                query = undefined,
                response = undefined,
                route = undefined,
                params = {};

            query = points.map(point => `${point.lat},${point.long}`).join(':');
            params = {
                'api-version': '1.0',
                'subscription-key': sails.config.appsettings.azure_maps.subscription_key,
                'query': query
            };
            response = await axios.get(sails.config.appsettings.azure_maps.url, { params });
            route = response.data.routes[0].summary;

            return exits.success({
                distance: route.lengthInMeters / 1000,
                time: route.travelTimeInSeconds / 60
            });
        } catch (err) {
            sails.log.debug("get-route-details.js (Line: 24) : err"); //debug
            // sails.log.debug(err); //debug
            sails.log.debug(err.response.data.error); //debug

            return exits.success(null);
        }
    }
};