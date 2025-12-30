# Build stage - Build code từ source
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven/Gradle files
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Download dependencies (cache layer)
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build application (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# Runtime stage - Chỉ chạy app
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/examreg-*.jar examreg.jar

# Expose port
EXPOSE 8080

# Health check (optional nhưng nên có)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "examreg.jar"]