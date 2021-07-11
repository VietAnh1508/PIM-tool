package com.elca.backend.controller;

import com.elca.backend.dto.ProjectStatus;
import com.elca.backend.model.Project;
import com.elca.backend.repository.ProjectRepository;
import com.elca.backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/project")
@Tag(name = "Project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    @Operation(summary = "Get all projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get project by id")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> projectOptional = projectRepository.findById(id);
        return projectOptional
                .map(project -> new ResponseEntity<>(project, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/pre-defined-status")
    @Operation(summary = "Get all project pre-defined statuses")
    public ResponseEntity<List<ProjectStatus>> getAllProjectPreDefinedStatus() {
        List<ProjectStatus> preDefinedStatus = projectService.getAllProjectPreDefinedStatus();
        return new ResponseEntity<>(preDefinedStatus, HttpStatus.OK);
    }

}
