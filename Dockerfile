# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copiar el archivo pom.xml para descargar dependencias y aprovechar la caché de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar el proyecto
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copiar el archivo jar desde el stage de compilación
COPY --from=build /app/target/*.jar app.jar

# Crear la carpeta para la carga de imágenes (uploads)
RUN mkdir -p /app/uploads

# Exponer el puerto interno en el que escucha la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
