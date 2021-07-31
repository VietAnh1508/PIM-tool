package com.elca.backend.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.elca.backend.dto.GroupDto;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Employee;
import com.elca.backend.model.Group;
import com.elca.backend.repository.EmployeeRepository;
import com.elca.backend.repository.GroupRepository;
import com.elca.backend.service.GroupService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GroupServiceImpl implements GroupService {

	private final GroupRepository groupRepository;
	private final EmployeeRepository employeeRepository;

	@Override
	public Group createGroup(final GroupDto groupDto) throws RecordNotFoundException {
		Optional<Employee> employeeOptional = employeeRepository.findById(groupDto.getLeaderId());
		if (!employeeOptional.isPresent()) {
			throw new RecordNotFoundException("Leader not found with id: " + groupDto.getLeaderId());
		}

		Group newGroup = groupDto.toGroup(employeeOptional.get());
		return groupRepository.save(newGroup);
	}

	@Override
	public Group updateGroup(final Long id, final GroupDto groupDto) throws RecordNotFoundException {
		Optional<Group> groupOptional = groupRepository.findById(id);
		if (!groupOptional.isPresent()) {
			throw new RecordNotFoundException("Group not found with id: " + id);
		}

		Optional<Employee> employeeOptional = employeeRepository.findById(groupDto.getLeaderId());
		if (!employeeOptional.isPresent()) {
			throw new RecordNotFoundException("Leader not found with id: " + groupDto.getLeaderId());
		}

		return groupOptional
				.map(group -> {
					group.setName(groupDto.getName());
					group.setLeader(employeeOptional.get());
					return groupRepository.save(group);
				})
				.orElse(null);
	}

}
