FROM openjdk:17-jdk-slim

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn

COPY pom.xml .

RUN ./mvnw dependency:go-offline

COPY . .

RUN ./mvnw clean package -DskipTests

CMD ["java", "-jar", "target/labreport-1.0.0-SNAPSHOT.jar"]
