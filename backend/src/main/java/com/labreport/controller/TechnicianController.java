package com.labreport.controller;

import com.labreport.dto.request.TechnicianRequestDTO;
import com.labreport.dto.response.TechnicianResponseDTO;
import com.labreport.service.TechnicianService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0/technicians")
@RequiredArgsConstructor
public class TechnicianController {

	private final TechnicianService technicianService;

	@PostMapping
	public ResponseEntity<TechnicianResponseDTO> saveTechnician(@Valid @RequestBody TechnicianRequestDTO technicianRequestDTO) {
		TechnicianResponseDTO createdTechnician = technicianService.save(technicianRequestDTO);
		return new ResponseEntity<>(createdTechnician, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<Page<TechnicianResponseDTO>> findAllTechnicians(Pageable page, @RequestParam(required = false, defaultValue = "") String search, @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
		Page<TechnicianResponseDTO> technicianResponseDTOList = technicianService.findAllTechnicians(page, search);
		return new ResponseEntity<>(technicianResponseDTOList, HttpStatus.OK);
	}

}
