# Timesheet API 

This application interates with google-calendar and google-spreadsheet to provides a high level API to build timesheet operations.

### Building

The example can be built with:

    $ mvn install

This automatically generates the application resource descriptors and builds the Docker image, so it requires access to a Docker daemon, relying on the `DOCKER_HOST` environment variable by default.

### Running the example locally

The example can be run locally using the following Maven goal:

    $ mvn spring-boot:run

Access the application API in:

	http://localhost:8080

