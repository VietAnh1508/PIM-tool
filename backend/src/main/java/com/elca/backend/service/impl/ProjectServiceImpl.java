package com.elca.backend.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.elca.backend.dto.ProjectDto;
import com.elca.backend.dto.ProjectStatus;
import com.elca.backend.exception.BadRequestException;
import com.elca.backend.exception.ProjectNumberAlreadyExistsException;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Group;
import com.elca.backend.model.Project;
import com.elca.backend.repository.ProjectRepository;
import com.elca.backend.service.GroupService;
import com.elca.backend.service.ProjectService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final GroupService groupService;
    private final ProjectRepository projectRepository;

    @Override
    public List<ProjectStatus> getAllProjectPreDefinedStatus() {
        return Arrays.stream(Project.Status.values())
                .map(value -> new ProjectStatus(value.name(), value.label))
                .collect(Collectors.toList());
    }

    @Override
    public Project createProject(final ProjectDto projectDto)
            throws ProjectNumberAlreadyExistsException, BadRequestException {
        validateProjectNumberExist(null, projectDto.getNumber());

        Group group;
        try {
            group = groupService.getGroupById(projectDto.getGroupId());
        } catch (RecordNotFoundException e) {
            throw new BadRequestException(e.getMessage());
        }

        return projectRepository.save(projectDto.toProject(group));
    }

    @Override
    public Project updateProject(final Long id, final ProjectDto projectDto)
            throws ProjectNumberAlreadyExistsException, BadRequestException {
        validateProjectNumberExist(id, projectDto.getNumber());

        Group group;
        try {
            group = groupService.getGroupById(projectDto.getGroupId());
        } catch (RecordNotFoundException e) {
            throw new BadRequestException(e.getMessage());
        }

        Optional<Project> projectOptional = projectRepository.findById(id);
        if (!projectOptional.isPresent()) {
            throw new BadRequestException("Project not found with id: " + id);
        }

        return projectOptional
                .map(project -> {
                    project.setCustomer(projectDto.getCustomer());
                    project.setGroup(group);
                    project.setName(projectDto.getName());
                    project.setStartDate(projectDto.getStartDate());
                    project.setEndDate(projectDto.getEndDate());
                    return projectRepository.save(project);
                })
                .orElse(null);
    }

    private void validateProjectNumberExist(final Long id, final Long projectNumber)
            throws ProjectNumberAlreadyExistsException {
        Optional<Project> projectOptional = projectRepository.findByProjectNumber(projectNumber);
        if (projectOptional.isPresent() && !projectOptional.get().getId().equals(id)) {
            throw new ProjectNumberAlreadyExistsException("The project number already existed. Please select a different project number");
        }
    }

}
