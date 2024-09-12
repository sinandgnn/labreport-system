package com.labreport.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReportResponseDTO {
	private Long reportNumber;
	private PatientResponseDTO patient;
	private TechnicianResponseDTO technician;
	private String diagnosisTitle;
	private String diagnosisDetails;
	private LocalDate reportDate;
	private String imagePath;
}
