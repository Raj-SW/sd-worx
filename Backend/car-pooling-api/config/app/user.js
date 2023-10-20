module.exports.user = {
    jwt: {
        secret: "this-is-a-seret-key",
        token_expiry: "1d",     //1 hour
        refresh_expiry: "10d",  //10 hour
    },
}