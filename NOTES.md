## Two important points about database connectivity: 
1. When connecting to databases, handling potential data-not-found scenarios is essential. Employ `try/catch` blocks or `promises` to manage errors or we can also use promises.

> key to remember : wrap in `try-catch` block or use promises to handle errors

2. Database operations involve latency, and traditional synchronous code can lead to blocking, where the program waits for the database query to complete before moving on. So, we should `async`/`await` which allows for non-blocking execution, enabling the program to continue with other tasks while waiting for the database response. 

> key to remember : always remember the database is in another continent, so use `async`/`await` to avoid blocking

## dotenv error
If you are using `dotenv` and you are importing like this:
```js
import dotenv from 'dotenv'
```
Then you need to run the `nodemon` command with `-r` flag to import the `dotenv` package. 

```js
"dev": "nodemon -r dotenv/config src/index.js"
```

But if you are using `require` to import `dotenv` like this:

```js
require('dotenv').config({ path: './config/.env'})
```
Then you don't need to use the `-r` flag with `nodemon` command.

```js
"dev": "nodemon src/index.js"
```

## Middleware (what is it? & Why do we use it?)
Middleware is a function that has access to the request and response objects. It can modify the request and response objects, end the request-response cycle, call the next middleware function in the stack, or do nothing at all.

We use middleware to:
- Execute code
- Make changes to the request and the response objects
- End the request-response cycle
- Call the next middleware function in the stack

## What is CORS?
CORS stands for Cross-Origin Resource Sharing. It is a security feature implemented in web browsers to prevent JavaScript code from making requests to a different domain than the one that served the web page. This is a security feature that is implemented in web browsers to prevent JavaScript code from making requests to a different domain than the one that served the web page.

