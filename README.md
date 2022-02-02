# [File Metadata Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice)

API serving basic `name`, `type`, and `size` metadata for uploaded files. Based on freeCodeCamp.org Backend API test suite/boilerplate code.

## Design
The main application server is located in `server.js`, which `require`s HTTP API endpoints in `/routes/endpoints.js` as `appRouter`.

`server.js` uses Node.js module `cluster` for simple concurrency support, as recommended in Heroku deployment best practices. This allows the application to process multiple requests simultaneously.
On application startup, the main process creates a worker pool with `cluster.fork()` until the number of forked processes reaches the `WEB_CONCURRENCY` limit. Should a worker process die, its identifier is logged and another worker is forked.

Each worker process instantiates its own `express()` application as `app`, and all workers listen on the same port. All workers `app.use(...)` the same middleware chain:
Middleware | Function
-|-
`helmet` | basic security
`cors` | cross-origin resource sharing support
`static` | serve static assets from `/public` (used for stylesheet)
`appRouter` | path router, see below

Worker maximum (`WEB_CONCURRENCY`) and listening port (`PORT`) are configurable through environment variables. `dotenv` is required in development for `.env` support. `development` is defined in the application as any non-production environment.

Note that HTTP `GET` requests to the root path (`'/'`) are served directly, rather than through the API router.

`endpoints.js` exports the application router, an instance of `express.Router()`, as `recordRoutes`. API endpoints include:

Path | Request | Response
-|-|-
`/api/fileanalyse` | `POST` | `{}`

## Stack
Layer | Technology
-|-
Front End | HTML / CSS (project boilerplate)
File Handling | Multer.js
Application Framework | Express.js
Server | Node.js
Database | N/A (none)
