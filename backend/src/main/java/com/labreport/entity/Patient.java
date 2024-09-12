package com.labreport.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // @ToString, @EqualsAndHashCode, @Getter, @Setter, @RequiredArgsConstructor
@Table(name = "patients")
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String fullName;

	@Column
	private String identityNumber;

}
