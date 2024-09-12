package com.labreport.service;

import com.labreport.dto.request.Credentials;
import com.labreport.dto.response.AuthResponseDTO;
import com.labreport.dto.response.TechnicianResponseDTO;
import com.labreport.entity.Technician;
import com.labreport.entity.Token;
import com.labreport.exception.AuthenticationException;
import com.labreport.repository.TechnicianRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final TokenService tokenService;
	private final TechnicianRepository technicianRepository;

	public AuthResponseDTO authenticate(Credentials credentials) {
		Technician inDB = technicianRepository.findByEmail(credentials.email());

		if (inDB == null) throw new AuthenticationException();

		if (!passwordEncoder.matches(credentials.password(), inDB.getPassword())) throw new AuthenticationException();

		Token token = tokenService.createToken(inDB,credentials);

		AuthResponseDTO authResponseDTO = new AuthResponseDTO();
		authResponseDTO.setToken(token);
		authResponseDTO.setTechnician(modelMapper.map(inDB, TechnicianResponseDTO.class));
		return authResponseDTO;
	}
}
