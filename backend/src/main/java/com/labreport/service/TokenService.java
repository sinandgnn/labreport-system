package com.labreport.service;

import com.labreport.dto.request.Credentials;
import com.labreport.entity.Technician;
import com.labreport.entity.Token;

public interface TokenService {

	public Token createToken(Technician technician, Credentials credentials);
	public Technician verifyToken(String authorizationHeader);

}
