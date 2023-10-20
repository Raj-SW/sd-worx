const axios = require('axios');


const AZURE_MAPS_SUBSCRIPTION_KEY = '87l8PLUb0h_i7r_ae9USFAj_NjMk1AfjXKXVw_HhbrU';
const AZURE_MAPS_URL = 'https://atlas.microsoft.com/route/directions/json?';

function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function minutesToTime(minutes) {
    let hours = Math.floor(minutes / 60) % 24; 
    let mins = Math.round(minutes % 60);

    if (mins === 60) {
        mins = 0;
        hours = (hours + 1) % 24;
    }

    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}



async function getRouteDetails(points) {
    const query = points.map(point => `${point.lat},${point.long}`).join(':');
    const params = {
        'api-version': '1.0',
        'subscription-key': AZURE_MAPS_SUBSCRIPTION_KEY,
        'query': query
    };
    try {
        const response = await axios.get(AZURE_MAPS_URL, { params });
        const route = response.data.routes[0].summary;
        return {
            distance: route.lengthInMeters / 1000,
            time: route.travelTimeInSeconds / 60 
        };
    } catch (error) {
        console.error('Error fetching route details:', error);
    }
}

async function findSuitableDrivers(user, usersData, destination, thresholdKm = 3) {
    const suitableDrivers = [];

    for (const driver of usersData) {
        if (driver.driver && driver.name !== user.name) {
            const availableSeats = driver.seats - driver.PassengersConfirmed.length;
            if (availableSeats <= 0) continue;

            let routePoints = [driver.location];
            driver.PassengersConfirmed.forEach(passengerName => {
                const passengerData = usersData.find(data => data.name === passengerName);
                if (passengerData) {
                    routePoints.push(passengerData.location);
                }
            });

            const directRouteDistance = await getRouteDetails([...routePoints, destination]);
            const routeViaUserDistance = await getRouteDetails([...routePoints, user.location, destination]);

            if (routeViaUserDistance.distance - directRouteDistance.distance <= thresholdKm) {
                suitableDrivers.push(driver);
            }
        }
    }
    return suitableDrivers;
}

async function getPickupTimesForDriver(driver, usersData, destination) {
    let routePoints = [driver.location];
    let currentLeaveTime = timeToMinutes(driver.leaveTime);
    const pickupTimes = {};

    for (const passengerName of driver.PassengersConfirmed) {
        const passengerData = usersData.find(data => data.name === passengerName);
        if (!passengerData) continue;

        const routeToPassengerDetails = await getRouteDetails([...routePoints, passengerData.location]);

        currentLeaveTime += routeToPassengerDetails.time;
        pickupTimes[passengerName] = minutesToTime(currentLeaveTime);
        routePoints.push(passengerData.location);
    }

    return pickupTimes;
}

const usersData = [
    {
        "location": {
            "lat": -20.224081723564833,
            "long": 57.52687508096228
        },
        "driver": false,
        "name": "user1",
    },
    {
        "location": {
            "lat": -20.220789655563557,
            "long": 57.53446305014205
        },
        "driver": true,
        "name": "user2",
        "seats": 3,
        "PassengersConfirmed": [
            "user4",
            "user3"
        ],
        "leaveTime": "08:00"
    },
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
    },
    {
        "location": {
            "lat": -20.2229823929673,
            "long": 57.5168627422342
        },
        "driver": true,
        "name": "user5",
        "seats": 3,
        "PassengersConfirmed": [
        ]
    },
    {
        "location": {
            "lat": 40.7484401,
            "long": -73.9878631
        },
        "driver": false,
        "name": "user6"
    },
    {
        "location": {
            "lat": -20.164609030128336,
            "long": 57.48618848896702
        },
        "driver": true,
        "name": "user7",
        "seats": 3,
        "PassengersConfirmed": [
        ]
    }
];
const user = { location: { lat: -20.224081723564833, long: 57.52687508096228 }, driver: false, name: 'user1' };
const destination = { lat: -20.24412458473163, long: 57.48950118126366 };

findSuitableDrivers(user, usersData, destination).then(drivers => {
    console.log(drivers);
});

const driver = usersData.find(u => u.name === 'user2');

getPickupTimesForDriver(driver, usersData, destination).then(pickupTimes => {
    for (const [passenger, time] of Object.entries(pickupTimes)) {
        console.log(`Driver ${driver.name} will pick up ${passenger} around ${time}`);
    }
});