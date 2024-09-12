package com.labreport.controller;

import com.labreport.dto.request.Credentials;
import com.labreport.dto.response.AuthResponseDTO;
import com.labreport.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping
	public AuthResponseDTO handleAuthentication(@Valid @RequestBody Credentials credentials) {
		return authService.authenticate(credentials);
	}

}
