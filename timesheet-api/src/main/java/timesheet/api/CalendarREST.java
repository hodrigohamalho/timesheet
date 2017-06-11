package timesheet.api;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class CalendarREST extends RouteBuilder{
	
    @Override
    public void configure() {       
    	
    	rest("/calendar").description("Google calendar API")

	    	.get("/").description("List events")
				.route().routeId("events-list")
				.to("mock:events-list")
				.endRest();
	}
}