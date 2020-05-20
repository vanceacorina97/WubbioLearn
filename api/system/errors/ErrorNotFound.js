class ErrorNotFound extends Error {

    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);

        this.status = 404;
        this.message = message;
        this.name = this.constructor.name;
    }
}

module.exports = ErrorNotFound;