module.exports = {
    security: {
        cors: {
            allRoutes: true,
            allowOrigins: "*",
            allowCredentials: false,
            allowRequestHeaders: "*",
        },
    },

    datastores: {
        default: {
            adapter: "sails-mongo",
            host: "0.0.0.0",
            port: 27017,
            database: "sd-worxs"
        }
    },

    sockets: {
        // onlyAllowOrigins: [
        //   "https://example.com",
        //   "https://staging.example.com",
        // ],
    },

    log: {
        level: "debug"
    },



    http: {
        cache: 365.25 * 24 * 60 * 60 * 1000, // One year
        // trustProxy: true,

    },

    port: 3550,

    // ssl: undefined
};