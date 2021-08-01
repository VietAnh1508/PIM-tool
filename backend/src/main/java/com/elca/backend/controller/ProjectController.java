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

import com.elca.backend.dto.ProjectDto;
import com.elca.backend.dto.ProjectStatus;
import com.elca.backend.exception.BadRequestException;
import com.elca.backend.exception.ProjectNumberAlreadyExistsException;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Project;
import com.elca.backend.repository.ProjectRepository;
import com.elca.backend.service.ProjectService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/project")
@Tag(name = "Project")
@AllArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;

    @GetMapping
    @ResponseBody
    @Operation(summary = "Get all projects")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseBody
    @Operation(summary = "Get project by id")
    public Project getProjectById(@PathVariable Long id) throws RecordNotFoundException {
        Optional<Project> projectOptional = projectRepository.findById(id);
        return projectOptional
                .orElseThrow(() -> new RecordNotFoundException("Project not found with id: " + id));
    }

    @GetMapping("/pre-defined-status")
    @ResponseBody
    @Operation(summary = "Get all project pre-defined statuses")
    public List<ProjectStatus> getAllProjectPreDefinedStatus() {
        return projectService.getAllProjectPreDefinedStatus();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create new project")
    public Project createProject(@Valid @RequestBody ProjectDto projectDto)
            throws ProjectNumberAlreadyExistsException, BadRequestException {
        return projectService.createProject(projectDto);
    }

    @PutMapping("/{id}")
    @ResponseBody
    @Operation(summary = "Update project")
    public Project updateProject(@PathVariable Long id, @Valid @RequestBody ProjectDto projectDto)
            throws ProjectNumberAlreadyExistsException, BadRequestException {
        return projectService.updateProject(id, projectDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete project")
    public void deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }

}
