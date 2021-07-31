package com.elca.backend.dto;

import com.elca.backend.model.Employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaderDto implements Leader {

	private Long id;

	private String firstName;

	private String lastName;

	public static LeaderDto fromEmployee(Employee employee) {
		return LeaderDto.builder()
				.id(employee.getId())
				.firstName(employee.getFirstName())
				.lastName(employee.getLastName())
				.build();
	}

}
