package com.labreport.repository;

import com.labreport.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
	Patient findByIdentityNumber(String identityNumber);
}