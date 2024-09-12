package com.labreport.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record Credentials(
		@NotBlank(message = "{labreport.constraints.email.notblank}")
		@Email(message = "{labreport.constraints.email.notvalid}")
		String email,

		@NotBlank(message = "{labreport.constraints.password.notblank}")
		String password) {
}
