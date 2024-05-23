export const ERR = {
    INTERNAL: {
        status: 500,
        message: 'Internal server error'
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
