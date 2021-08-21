package com.elca.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.elca.backend.dto.GroupDto;
import com.elca.backend.exception.BadRequestException;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Employee;
import com.elca.backend.model.Group;
import com.elca.backend.repository.GroupRepository;
import com.elca.backend.repository.GroupSpecification;
import com.elca.backend.service.EmployeeService;
import com.elca.backend.service.GroupService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GroupServiceImpl implements GroupService {

	private final GroupRepository groupRepository;
	private final EmployeeService employeeService;

	@Override
	public Group getGroupById(final Long id) throws RecordNotFoundException {
		Optional<Group> groupOptional = groupRepository.findById(id);
		return groupOptional.orElseThrow(() -> new RecordNotFoundException("Given group id is not exists"));
	}

	@Override
	public List<Group> searchGroup(final String searchText) {
		if (StringUtils.isEmpty(searchText)) {
			return groupRepository.findAll();
		}

		return groupRepository.findAll(
				Specification.where(GroupSpecification.nameContains(searchText))
						.or(GroupSpecification.leaderNameContains(searchText))
		);
	}

	@Override
	public Group createGroup(final GroupDto groupDto) throws BadRequestException {
		Employee employee;
		try {
			employee = employeeService.getEmployeeById(groupDto.getLeaderId());
		} catch (RecordNotFoundException e) {
			throw new BadRequestException(e.getMessage());
		}

		Group newGroup = groupDto.toGroup(employee);
		return groupRepository.save(newGroup);
	}

	@Override
	public Group updateGroup(final Long id, final GroupDto groupDto) throws BadRequestException {
		Optional<Group> groupOptional = groupRepository.findById(id);
		if (!groupOptional.isPresent()) {
			throw new BadRequestException("Group not found with id: " + id);
		}

		Employee leader;
		try {
			leader = employeeService.getEmployeeById(groupDto.getLeaderId());
		} catch (RecordNotFoundException e) {
			throw new BadRequestException(e.getMessage());
		}

		return groupOptional
				.map(group -> {
					group.setName(groupDto.getName());
					group.setLeader(leader);
					return groupRepository.save(group);
				})
				.orElse(null);
	}

}
