package com.labreport.service;

import com.labreport.dto.request.Credentials;
import com.labreport.entity.Technician;
import com.labreport.entity.Token;
import com.labreport.repository.TechnicianRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class BasicAuthTokenService implements TokenService {


	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final TechnicianRepository technicianRepository;

	public BasicAuthTokenService(TechnicianRepository technicianRepository) {
		this.technicianRepository = technicianRepository;
	}

	@Override
	public Token createToken(Technician technician, Credentials credentials) {
		String tokenString = credentials.email() + ":" + credentials.password();
		String token = Base64.getEncoder().encodeToString(tokenString.getBytes());
		return new Token("Basic", token);
	}

	@Override
	public Technician verifyToken(String authorizationHeader) {
		if (authorizationHeader == null) return null;
		String base64Encoded = authorizationHeader.split("Basic ")[1];
		String decoded = new String(Base64.getDecoder().decode(base64Encoded));

		String[] credentials = decoded.split(":");
		String email = credentials[0];
		String password = credentials[1];

		Technician inDB = technicianRepository.findByEmail(email);
		if (inDB == null) return null;

		if(!passwordEncoder.matches(password, inDB.getPassword())) return null;

		return inDB;
	}
}
