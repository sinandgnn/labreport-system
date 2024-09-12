package com.labreport.validation;

import com.labreport.entity.Technician;
import com.labreport.repository.TechnicianRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

	private final TechnicianRepository technicianRepository;

	@Override
	public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
		Technician inDB = technicianRepository.findByEmail(s);
		return inDB == null;
	}
}
