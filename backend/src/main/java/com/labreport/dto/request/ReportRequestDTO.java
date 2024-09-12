package com.labreport.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReportRequestDTO {

	@NotNull
	private Long technicianId;

	@NotNull(message = "{labreport.constraints.patientId.notblank}")
	private Long patientIdentityNumber;

	@NotBlank(message = "{labreport.constraints.name.notblank}")
	private String patientFullName;

	@NotBlank(message = "{labreport.constraints.title.notblank}")
	private String diagnosisTitle;

	@NotBlank(message = "{labreport.constraints.details.notblank}")
	private String diagnosisDetails;

	@NotNull(message = "{labreport.constraints.date.notblank}")
	private LocalDate reportDate;

	@NotBlank(message = "{labreport.constraints.image.notblank}")
	private String imagePath;
}
