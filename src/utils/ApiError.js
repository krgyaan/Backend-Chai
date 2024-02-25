class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong.",
        errors = [],
        sstack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.error = errors
        this.sucess = false

        if (error.length > 0) {
            this.errors = error
        }

        if (sstack) {
            this.stack = sstack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }