package com.labreport.service;

import com.labreport.dto.request.ReportRequestDTO;
import com.labreport.dto.request.ReportUpdateRequestDTO;
import com.labreport.dto.response.ReportResponseDTO;
import com.labreport.entity.Patient;
import com.labreport.entity.Report;
import com.labreport.entity.Technician;
import com.labreport.repository.PatientRepository;
import com.labreport.repository.ReportRepository;
import com.labreport.repository.TechnicianRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

	private final ReportRepository reportRepository;
	private final PatientRepository patientRepository;
	private final ModelMapper modelMapper;
	private final TechnicianRepository technicianRepository;
	private final FileService fileService;


	@Transactional
	public ReportResponseDTO saveReport(@Valid ReportRequestDTO reportRequestDTO) {
		Patient patient = patientRepository.findByIdentityNumber(String.valueOf(reportRequestDTO.getPatientIdentityNumber()));

		if (patient == null) {
			Patient newPatient = new Patient();
			newPatient.setFullName(reportRequestDTO.getPatientFullName());
			newPatient.setIdentityNumber(String.valueOf(reportRequestDTO.getPatientIdentityNumber()));
			patientRepository.save(newPatient);
			patient = newPatient;
		} else {
			if (!patient.getFullName().equalsIgnoreCase(reportRequestDTO.getPatientFullName())) {
				throw new RuntimeException("aynı tc kimlik numaralı farklı isimli bir hasta var!");
			}
		}

		Technician technician = technicianRepository.findById(reportRequestDTO.getTechnicianId())
				.orElseThrow(() -> new RuntimeException("Technician not found with ID: " + reportRequestDTO.getTechnicianId()));

		Report report = new Report();
		report.setPatient(patient);
		report.setTechnician(technician);
		report.setDiagnosisTitle(reportRequestDTO.getDiagnosisTitle());
		report.setDiagnosisDetails(reportRequestDTO.getDiagnosisDetails());
		report.setReportDate(reportRequestDTO.getReportDate());
		if (reportRequestDTO.getImagePath() != null && !reportRequestDTO.getImagePath().isEmpty()) {
			String fileName = fileService.saveBase64StringAsFile(reportRequestDTO.getImagePath());
			report.setImagePath(fileName);
		}

		reportRepository.save(report);

		return modelMapper.map(report, ReportResponseDTO.class);
	}

	@Transactional(readOnly = true)
	public ReportResponseDTO findReportById(Long id) {
		Report report = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
		return modelMapper.map(report, ReportResponseDTO.class);
	}

	@Transactional(readOnly = true)
	public Page<ReportResponseDTO> findAllReports(Pageable page, String search) {
		Page<Report> reports;
		if (search == null || search.isEmpty()) {
			reports = reportRepository.findAll(page);
		} else {
			reports = reportRepository.findBySearchCriteria(search, page);
		}

		return reports.map(report -> modelMapper.map(report, ReportResponseDTO.class));
	}

	@Transactional
	public ReportResponseDTO updateReport(Long id, ReportUpdateRequestDTO reportRequestDTO) {
		Report existingReport = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));

		existingReport.setDiagnosisTitle(reportRequestDTO.getDiagnosisTitle());
		existingReport.setDiagnosisDetails(reportRequestDTO.getDiagnosisDetails());

		reportRepository.save(existingReport);
		return modelMapper.map(existingReport, ReportResponseDTO.class);
	}

	public void deleteReport(Long id) {
		if (!reportRepository.existsById(id)) {
			throw new RuntimeException("Report not found");
		}
		reportRepository.deleteById(id);
	}
}
