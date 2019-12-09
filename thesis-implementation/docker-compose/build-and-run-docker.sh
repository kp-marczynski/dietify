#!/bin/bash
cd ../gateway
sh gradlew bootJar -Pprod jibDockerBuild
cd ../products
sh gradlew bootJar -Pprod jibDockerBuild
cd ../recipes
sh gradlew bootJar -Pprod jibDockerBuild
cd ../mealplans
sh gradlew bootJar -Pprod jibDockerBuild
cd ../appointments
sh gradlew bootJar -Pprod jibDockerBuild
cd ../docker-compose
sh docker-compose up
