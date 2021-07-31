package com.elca.backend.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.elca.backend.dto.GroupDto;
import com.elca.backend.dto.SimpleGroupDto;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Group;
import com.elca.backend.repository.GroupRepository;
import com.elca.backend.service.GroupService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/group")
@Tag(name = "Group")
@AllArgsConstructor
public class GroupController {

	private final GroupService groupService;
	private final GroupRepository groupRepository;

	@GetMapping
	@ResponseBody
	@Operation(summary = "Get all groups")
	public List<Group> getAllGroups() {
		return groupRepository.findAll();
	}

	@GetMapping("/simple")
	@ResponseBody
	@Operation(summary = "Get all groups with simple data")
	public List<SimpleGroupDto> getAllGroupWithSimpleData() {
		return groupRepository.getSimpleGroupsBy();
	}

	@GetMapping("/{id}")
	@ResponseBody
	@Operation(summary = "Get group by id")
	public Group getGroupById(@PathVariable Long id) throws RecordNotFoundException {
		Optional<Group> groupOptional = groupRepository.findById(id);
		return groupOptional
				.orElseThrow(() -> new RecordNotFoundException("Group not found with id: " + id));
	}

	@PostMapping
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	@Operation(summary = "Create new group")
	public Group createNewGroup(@Valid @RequestBody GroupDto groupDto) throws RecordNotFoundException {
		return groupService.createGroup(groupDto);
	}

	@PutMapping("/{id}")
	@Operation(summary = "Update group")
	public Group updateGroup(@PathVariable Long id, @Valid @RequestBody GroupDto groupDto)
			throws RecordNotFoundException {
		return groupService.updateGroup(id, groupDto);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@Operation(summary = "Delete group")
	public void deleteGroup(@PathVariable Long id) {
		groupRepository.deleteById(id);
	}

}
