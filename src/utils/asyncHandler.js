const asyncHandler = (reqHandler) => {
    return (req, res, nxt) => {
        Promise.resolve(reqHandler(req, res, nxt))
            .catch((err) => {
                nxt(err)
            })
    }
}

export { asyncHandler }

/*
The asyncHandler function is a higher-order function that takes an Express request handler function as an argument and returns a new request handler function. The new request handler function wraps the original request handler function in a Promise.resolve() block and catches any errors that occur during the execution of the original request handler function. This allows us to use async/await syntax in our request handler functions without having to explicitly handle Promise rejections and errors.

High order function:
A higher-order function is a function that takes one or more functions as arguments and/or returns a new function. Higher-order functions are a fundamental concept in functional programming and are widely used in JavaScript to create reusable and composable code.

const asyncHandler = () => {}
const asyncHandler = (func) => () => {}
const asyncHandler = (func) => async () => {}

const asyncHandler = (reqHandler) => async (req, res, nxt) => {
    try {
        await reqHandler(req, res, nxt)
    } catch (err) {
        res.status(err.code || 500)
        .json({ 
            success: false, 
            message: err.message 
        })
    }
}

*/