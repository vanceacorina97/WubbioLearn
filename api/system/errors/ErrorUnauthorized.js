class ErrorUnauthorized extends Error {

    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);

        this.status = 401;
        this.message = message;
        this.name = this.constructor.name;
    }
}

module.exports = ErrorUnauthorized;