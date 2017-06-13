package timesheet.api;

import java.util.ArrayList;
import java.util.List;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.google.calendar.GoogleCalendarComponent;
import org.apache.camel.component.google.calendar.GoogleCalendarConfiguration;

public class GoogleCalendarSetup extends RouteBuilder{

	@Override
	public void configure() throws Exception {
		List<String> scopes = new ArrayList<String>();
    	scopes.add("https://www.googleapis.com/auth/userinfo.profile");
    	scopes.add("https://www.googleapis.com/auth/userinfo.email");
    	scopes.add("https://www.googleapis.com/auth/drive"); 
    	scopes.add("https://www.googleapis.com/auth/drive.readonly"); 
    	scopes.add("https://www.googleapis.com/auth/spreadsheets");
    	scopes.add("https://www.googleapis.com/auth/spreadsheets.readonly");
    	scopes.add("https://www.googleapis.com/auth/calendar"); 
    	scopes.add("https://www.googleapis.com/auth/calendar.readonly");
    	
    	GoogleCalendarConfiguration config = new GoogleCalendarConfiguration();
    	config.setClientId("483971248715-hva8n0p8q6d3qou8bftesds07do8h321.apps.googleusercontent.com");
    	config.setClientSecret("...");
    	config.setApplicationName("...");
    	config.setScopes(scopes);
    	
    	GoogleCalendarComponent component = new GoogleCalendarComponent(getContext());
    	component.setConfiguration(config);
    	getContext().addComponent("google-calendar", component);
	}

}
