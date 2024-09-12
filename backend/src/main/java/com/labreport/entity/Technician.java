package com.labreport.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "technicians")
public class Technician {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String email;

	@Column
	private String fullName;

	@Column
	private String password;

	@Column(unique = true)
	private String hospitalIdentityNumber;

	@Column
	private boolean isAdmin;

}
