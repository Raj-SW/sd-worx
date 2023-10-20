import React from 'react';
import RouteExample from './Map/Map';

const mapOptions = {
    authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: '87l8PLUb0h_i7r_ae9USFAj_NjMk1AfjXKXVw_HhbrU'
    },
    center: [57.5345, -20.2208], // roughly the center based on your data
    zoom: 12
};

function Driver() {
    const driver = {
        "location": {
            "lat": -20.220789655563557,
            "long": 57.53446305014205
        },
        "driver": true,
        "name": "user2",
        "seats": 3,
        "PassengersConfirmed": [
            {
                "location": {
                    "lat": -20.216823114003493,
                    "long": 57.52866531239014
                },
                "driver": false,
                "name": "user3"
            },
            {
                "location": {
                    "lat": -20.2229823929673,
                    "long": 57.516862744311645
                },
                "driver": false,
                "name": "user4"
            }
        ],
        "leaveTime": "08:00"
    }

    return (
        <RouteExample />
    );
}

export default Driver;
