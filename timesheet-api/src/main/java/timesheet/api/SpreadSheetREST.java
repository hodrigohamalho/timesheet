package timesheet.api;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class SpreadSheetREST extends RouteBuilder{
	
    @Override
    public void configure() {       
    	
    	rest("/spreadsheet").description("Google spreadsheet API")

	    	.get("/").description("List entries")
				.route().routeId("entries-list")
				.to("mock:entries-list")
				.endRest();
	}
}