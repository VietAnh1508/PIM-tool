package com.elca.backend.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.elca.backend.dto.ProjectDto;
import com.elca.backend.dto.ProjectStatus;
import com.elca.backend.exception.BadRequestException;
import com.elca.backend.exception.ProjectNumberAlreadyExistsException;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Employee;
import com.elca.backend.model.Group;
import com.elca.backend.model.Project;
import com.elca.backend.repository.EmployeeRepository;
import com.elca.backend.repository.ProjectRepository;
import com.elca.backend.service.EmployeeService;
import com.elca.backend.service.GroupService;
import com.elca.backend.service.ProjectService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final GroupService groupService;
    private final EmployeeService employeeService;
    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public List<ProjectStatus> getAllProjectPreDefinedStatus() {
        return Arrays.stream(Project.Status.values())
                .map(value -> new ProjectStatus(value.name(), value.label))
                .collect(Collectors.toList());
    }

    @Override
    public Project createProject(final ProjectDto projectDto)
            throws ProjectNumberAlreadyExistsException, BadRequestException {
        if (projectDto.getNumber() == null) {
            throw new BadRequestException("Project number is required");
        }
        validateProjectNumberExist(null, projectDto.getNumber());

        Group group;
        try {
            group = groupService.getGroupById(projectDto.getGroupId());
        } catch (RecordNotFoundException e) {
            throw new BadRequestException(e.getMessage());
        }

        Project newProject = projectRepository.save(projectDto.toProject(group));

        setProjectToEmployees(projectDto.getMembers(), newProject);

        return newProject;
    }

    @Override
    public Project updateProject(final Long id, final ProjectDto projectDto)
            throws ProjectNumberAlreadyExistsException, BadRequestException {
        if (projectDto.getNumber() != null) {
            validateProjectNumberExist(id, projectDto.getNumber());
        }

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

        Project updatedProject = projectOptional.map(project -> {
            project.setName(projectDto.getName());
            project.setCustomer(projectDto.getCustomer());
            project.setGroup(group);
            project.setStatus(projectDto.getStatus());
            project.setStartDate(projectDto.getStartDate());
            project.setEndDate(projectDto.getEndDate());
            return projectRepository.save(project);
        }).orElse(null);

        setProjectToEmployees(projectDto.getMembers(), updatedProject);

        return updatedProject;
    }

    private void validateProjectNumberExist(final Long id, final Long projectNumber)
            throws ProjectNumberAlreadyExistsException {
        Optional<Project> projectOptional = projectRepository.findByProjectNumber(projectNumber);
        if (projectOptional.isPresent() && !projectOptional.get().getId().equals(id)) {
            throw new ProjectNumberAlreadyExistsException("The project number already existed. Please select a different project number");
        }
    }

    private void setProjectToEmployees(Set<String> listVisa, Project project) {
        Set<Employee> members = employeeService.getEmployeeByListVisa(listVisa);
        for (Employee employee : members) {
            employee.getProjects().add(project);
        }
        employeeRepository.saveAll(members);
    }

}
