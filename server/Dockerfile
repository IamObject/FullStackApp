FROM openjdk:17

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} server.jar

ENTRYPOINT ["java", "-jar","/server.jar"]

EXPOSE 8081

#docker build -t server:0.0.1 .
#docker run -d -p8081:8081 --name server 2097a78a7493
# docker logs 3ab8eb4ea41c

# docker pull mysql
