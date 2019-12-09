# Dietify

## Prerequisites

-   [Node.js][]
-   [jdk11][]

## How to run?
### With Docker
Simply run: 
    
    sh docker-compose/build-and-run-docker.sh
    
Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

### Without Docker
First start eureka service discovery: 

    sh service-discovery/start-registry.sh
    
For each app { gateway, products, recipes, mealplans, appointments } run in app root directory: 
    
    ./gradlew 

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

For live frontend reload run in gateway app root directory: 
    
    npm install && npm start

Then navigate to [http://localhost:9000](http://localhost:9000) in your browser.

## Building for production
For each app { gateway, products, recipes, mealplans, appointments } run in app root directory:
    
    ./gradlew -Pprod clean bootJar

[node.js]: https://nodejs.org/
[jdk11]: https://openjdk.java.net/projects/jdk/11/
