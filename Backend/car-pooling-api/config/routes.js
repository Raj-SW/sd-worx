module.exports.routes = {
  //user
  "post /v1/user/login": {
    action: "user/login",
  },

  "post /v1/user/create": {
    action: "user/create",
  },

  "post /v1/user/info": {
    action: "user/info",
  },

  //car
  "post /v1/car/new": {
    action: "car/new",
  },

  "post /v1/car/list": {
    action: "car/list",
  },

  //trip
  "post /v1/trip/new": {
    action: "trip/new",
  },

  "post /v1/trip/list": {
    action: "trip/list",
  },

  "post /v1/trip/pickups": {
    action: "trip/pickups",
  },

  "post /v1/trip/search": {
    action: "trip/search",
  },

  //booking
  "post /v1/booking/new": {
    action: "booking/new",
  },

  // driver can accept or reject a booking
  // "post /v1/booking/accept": {
  //   action: "booking/accept",
  // },

  // "post /v1/booking/reject": {
  //   action: "booking/reject",
  // },

  // get list of possible drivers for a user wishing to carpool
  "post /v1/booking/list": {
    action: "booking/list",
  },
}