package com.labreport.service;

import com.labreport.dto.request.TechnicianRequestDTO;
import com.labreport.dto.response.TechnicianResponseDTO;
import com.labreport.entity.Technician;
import com.labreport.exception.NotUniqueEmailException;
import com.labreport.repository.TechnicianRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class TechnicianService {

	private final ModelMapper modelMapper;
	private final TechnicianRepository technicianRepository;
	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public TechnicianResponseDTO save(@Valid TechnicianRequestDTO technicianRequestDTO) {
		try {
			String encodedPassword = passwordEncoder.encode(technicianRequestDTO.getPassword());
			Technician technician = modelMapper.map(technicianRequestDTO, Technician.class);
			Random random = new Random();
			String hospitalIdentityNumber = String.valueOf(1000000L + random.nextInt(9000000));
			technician.setHospitalIdentityNumber(hospitalIdentityNumber);
			technician.setPassword(encodedPassword);
			technicianRepository.save(technician);
			return modelMapper.map(technician, TechnicianResponseDTO.class);
		} catch (DataIntegrityViolationException e) {
			throw new NotUniqueEmailException();
		}
	}

	public Page<TechnicianResponseDTO> findAllTechnicians(Pageable page, String search) {
		Page<Technician> technicians;

		if (search == null || search.isEmpty()) {
			technicians = technicianRepository.findAll(page);
		} else {
			technicians = technicianRepository.findBySearchQuery(search, page);
		}

		return technicians.map(technician -> modelMapper.map(technician, TechnicianResponseDTO.class));
	}
}
