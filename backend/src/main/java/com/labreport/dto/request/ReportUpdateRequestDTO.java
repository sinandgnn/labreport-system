package com.labreport.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportUpdateRequestDTO {
	@NotBlank(message = "{labreport.constraints.title.notblank}")
	private String diagnosisTitle;

	@NotBlank(message = "{labreport.constraints.details.notblank}")
	private String diagnosisDetails;
}
