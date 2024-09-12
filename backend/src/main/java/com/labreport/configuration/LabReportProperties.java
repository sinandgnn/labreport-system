package com.labreport.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "labreport")
@Configuration
public class LabReportProperties {

	@Getter
	@Setter
	private Storage storage = new Storage();

	@Getter
	@Setter
	public static class Storage {
		String root = "uploads";
		String reports = "reports_img";


	}
}
