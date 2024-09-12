package com.labreport.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "reports")
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reportNumber;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "patient")
	private Patient patient;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "technician")
	private Technician technician;

	@Column
	private String diagnosisTitle;

	@Column
	private String diagnosisDetails;

	@Column
	private LocalDate reportDate;

	@Column
	@Lob
	private String imagePath;

}
