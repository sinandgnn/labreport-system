package com.labreport;

import com.labreport.entity.Technician;
import com.labreport.repository.TechnicianRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class LabReportApplication {

	public static void main(String[] args) {
		SpringApplication.run(LabReportApplication.class, args);
	}

	@Bean
	CommandLineRunner createTechnician(TechnicianRepository technicianRepository) {
		return args -> {

			String adminEmail = "admin@mail.com";
			Technician inDB = technicianRepository.findByEmail(adminEmail);

			if (inDB == null) {
				PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
				Technician admin = new Technician();
				admin.setEmail(adminEmail);
				admin.setFullName("Default Technician");
				admin.setPassword(passwordEncoder.encode("admin"));
				admin.setHospitalIdentityNumber("1098375");
				admin.setAdmin(true);
				technicianRepository.save(admin);
			}
		};
	}

}
