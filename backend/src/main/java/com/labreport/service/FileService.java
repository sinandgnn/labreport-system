package com.labreport.service;

import com.labreport.configuration.LabReportProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

	private final LabReportProperties labReportProperties;

	public String saveBase64StringAsFile(String imagePath) {
		String fileName = UUID.randomUUID().toString();

		Path path = Paths.get(labReportProperties.getStorage().getRoot(),labReportProperties.getStorage().getReports(), fileName);
		try {
			OutputStream outputStream = new FileOutputStream(path.toFile());
			byte[] base64decoded = Base64.getDecoder().decode(imagePath.split(",")[1]);
			outputStream.write(base64decoded);
			outputStream.close();
			return fileName;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}
}
