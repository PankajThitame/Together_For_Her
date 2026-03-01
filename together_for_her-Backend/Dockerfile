# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create a non-root user and group
RUN addgroup --system spring && adduser --system spring --ingroup spring

# Explicitly copy the SNAPSHOT jar and give ownership to the spring user
COPY --from=build --chown=spring:spring /app/target/together_for_her-0.0.1-SNAPSHOT.jar /app/app.jar

USER spring
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
