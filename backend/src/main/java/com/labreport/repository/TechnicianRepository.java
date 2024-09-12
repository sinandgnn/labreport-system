package com.labreport.repository;

import com.labreport.entity.Technician;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicianRepository extends JpaRepository<Technician, Long> {
	Technician findByEmail(String username);

	@Query("SELECT t FROM Technician t WHERE " +
			"LOWER(t.hospitalIdentityNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
			"LOWER(t.fullName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
			"LOWER(t.email) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Technician> findBySearchQuery(String search, Pageable pageable);
}
