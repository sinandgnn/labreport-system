package com.labreport.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TechnicianResponseDTO {
	private Long id;
	private String fullName;
	private String email;
	private String hospitalIdentityNumber;
	private boolean isAdmin;
}
