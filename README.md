# Dietify

## Prerequisites

-   [Node.js][]
-   [jdk8][]

## How to run?

    backend: ./mvnw
    frontend: npm start

## Building for production

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

## Backend tests

    ./mvnw clean test

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    npm test

For more information, refer to the [Running tests page][].

## Using Docker

To start a mysql database in a docker container, run:

    docker-compose -f src/main/docker/mysql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw package -Pprod verify jib:dockerBuild

Then run:

    docker-compose -f src/main/docker/app.yml up -d

## TODO

-   [x] framework mvc
-   [x] usage of orm
-   [x] usage of cache (backend only)
-   [x] user authentication & authorization
-   [x] admin panel
-   [ ] integration with external service
-   [x] unit tests
-   [x] ajax elements
-   [x] charts
-   [x] connected selectboxes - choosing product category trigger retriving of proper subcategories
-   [x] navbar options
-   [x] loader css

[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: http://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: http://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: http://leafletjs.com/
[definitelytyped]: http://definitelytyped.org/
[jdk8]: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
