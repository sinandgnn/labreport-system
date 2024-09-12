package com.labreport.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class ApiError {

	private int status;

	private String message;

	private String path;

	private long timestamp = new Date().getTime();

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private Map<String,String> validationErrors = new HashMap<>();

}
