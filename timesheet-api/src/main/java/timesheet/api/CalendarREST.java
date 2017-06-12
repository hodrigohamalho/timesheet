package timesheet.api;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.stereotype.Component;

@Component
public class CalendarREST extends RouteBuilder{
	
	private String BASE_URL = "https://www.googleapis.com/calendar/v3/calendars/";

    @Override
    public void configure() {       
    	rest("/calendar").description("Google calendar API")

	    	.get("/").description("List events")
					.param().name("token").type(RestParamType.query).description("AccessToken").endParam()
					.param().name("email").type(RestParamType.query).description("user email").endParam()
					.param().name("maxResults").type(RestParamType.query).description("Number of events returned").endParam()
					.route().routeId("entries-list").tracing()
					.log("recovering events for account: ${header.email}")
					.to("google-calendar://events/list")
					.endRest();
    	
    	
	}
}