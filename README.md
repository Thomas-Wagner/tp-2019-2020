## TP noté 2019-2020

### How to start

First time you're starting the application, install the dependencies:

[![Build Status](https://github.com/Thomas-Wagner/tp-2019-2020)](https://github.com/Thomas-Wagner/tp-2019-2020)

```
docker-compose run web npm install
```

Then start the web server with:

```
docker-compose up
```

Then in the browser: [http://localhost:1337](http://localhost:1337)

If you have the error message:

```text
web_1  | error: A hook (`orm`) failed to load!
web_1  | error: Failed to lift app: Error: Automigrations failed.  (See logs above for help, and a summary of what went wrong.)
web_1  |     at Timeout._onTimeout (/app/node_modules/waterline-utils/lib/auto-migrations/private/run-alter-strategy/private/inform-re-failed-alter-stratagem.js:213:55)
web_1  |     at ontimeout (timers.js:436:11)
web_1  |     at tryOnTimeout (timers.js:300:5)
web_1  |     at listOnTimeout (timers.js:263:5)
web_1  |     at Timer.processTimers (timers.js:223:10)
```

It means the web container started before the database. Type in a second
terminal `docker restart web` and wait for the migrations to be executed.

### Resources

- [Sails framework documentation](https://sailsjs.com/get-started)
