package com.elca.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.elca.backend.model.Employee;
import com.elca.backend.model.Group;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupDto {

	@NotBlank
	private String name;

	@NotNull
	private Long leaderId;

	public Group toGroup(Employee leader) {
		return Group.builder()
				.name(this.name)
				.leader(leader)
				.build();
	}

}
