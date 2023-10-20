module.exports.apperrors = {
    general: {
        unknown_error: {
            code: 7100,
            message: "An error occurred, please refresh and try again",
        },
        invalid_parameters: {
            code: 7101,
            message: "Invalid parameters",
        },
        forbidden_error: {
            code: 7102,
            message: "Invalid app token",
        },
    },
    user: {
        invalid_credentials: {
            code: 7200,
            message: "Invalid Credentials",
        },
        invalid_login_password: {
            code: 7201,
            message: "Invalid Password",
        },
    },
    auth: {
		incorrect_header_token: {
			code: 7300,
			message: "Incorrect Header Token",
		},
		invalid_header_token: {
			code: 7301,
			message: "Invalid Header Token",
		},
    },
    trip: {
        list_error: {
			code: 7400,
			message: "Unable to retrieve list of available trips",
		},
    }
}