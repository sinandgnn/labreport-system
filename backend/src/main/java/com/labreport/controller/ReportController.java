package com.labreport.controller;

import com.labreport.dto.request.ReportRequestDTO;
import com.labreport.dto.request.ReportUpdateRequestDTO;
import com.labreport.dto.response.ReportResponseDTO;
import com.labreport.service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0/reports")
@RequiredArgsConstructor
public class ReportController {

	private final ReportService reportService;

	@PostMapping
	public ResponseEntity<ReportResponseDTO> saveReport(@Valid @RequestBody ReportRequestDTO reportRequestDTO) {
		ReportResponseDTO createdReport = reportService.saveReport(reportRequestDTO);
		return new ResponseEntity<>(createdReport, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ReportResponseDTO> getReportById(@PathVariable Long id) {
		ReportResponseDTO reportResponseDTO = reportService.findReportById(id);
		return new ResponseEntity<>(reportResponseDTO, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<Page<ReportResponseDTO>> findAllReports(Pageable page, @RequestParam(required = false, defaultValue = "") String search) {
		Page<ReportResponseDTO> ReportResponseDTOList = reportService.findAllReports(page, search);
		return new ResponseEntity<>(ReportResponseDTOList, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ReportResponseDTO> updateReport(@PathVariable Long id, @Valid @RequestBody ReportUpdateRequestDTO reportRequestDTO) {
		ReportResponseDTO reportResponseDTO = reportService.updateReport(id, reportRequestDTO);
		return new ResponseEntity<>(reportResponseDTO, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
		reportService.deleteReport(id);
		return new ResponseEntity<>(HttpStatus.OK);

	}
}
