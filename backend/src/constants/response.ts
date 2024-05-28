export const ERR = {
    INTERNAL: {
        status: 500,
        message: 'Internal server error'
    },
    BAD_REQUEST: {
        status: 400,
        message: 'Bad request'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized',
        hint: 'Likely caused by a missing JSON web token'
    },
    FORBIDDEN: {
        status: 403,
        message: 'Forbidden',
        hint: 'Likely caused by an invalid JSON web token'
    },
    SIGNUP: {
        USER_EXISTS: {
            status: 409,
            message: 'User already exists'
        }
    },
    LOGIN: {
        INVALID: {
            status: 401,
            message: 'Invalid username or password'
        }
    }
};

export const MSG = {
    OK: {
        status: 200,
        message: 'OK'
    }
};
