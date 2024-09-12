package com.labreport.repository;

import com.labreport.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
	@Query("SELECT r FROM Report r WHERE " +
			"LOWER(r.patient.fullName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
			"r.patient.identityNumber LIKE CONCAT('%', :search, '%') OR " +
			"r.technician.hospitalIdentityNumber LIKE CONCAT('%', :search, '%') OR " +
			"CAST(r.reportNumber AS string) LIKE CONCAT('%', :search, '%') OR " +
			"LOWER(r.technician.fullName) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Report> findBySearchCriteria(@Param("search") String search, Pageable pageable);
}