package com.labreport.dto.request;

import com.labreport.validation.UniqueEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TechnicianRequestDTO {

	@NotBlank(message = "{labreport.constraints.name.notblank}")
	@Size(max = 50, message = "{labreport.constraints.name.size}")
	private String fullName;

	@NotBlank(message = "{labreport.constraints.email.notblank}")
	@Email(message = "{labreport.constraints.email.notvalid}")
	@UniqueEmail
	private String email;

	@Pattern(
			regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d`~!@#$%^&*()\\-_=+\\[\\]{}\\\\|;:'\",<.>/?\\s]{8,}$",
			message = "{labreport.constraints.password.format}"
	)

	private String password;

	private boolean isAdmin;

}
