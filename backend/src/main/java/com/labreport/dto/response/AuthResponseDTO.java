package com.labreport.dto.response;

import com.labreport.entity.Token;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDTO {

	TechnicianResponseDTO technician;
	Token token;

}
