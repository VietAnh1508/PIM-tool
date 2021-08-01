package com.elca.backend.service;

import com.elca.backend.dto.ProjectDto;
import com.elca.backend.dto.ProjectStatus;
import com.elca.backend.exception.BadRequestException;
import com.elca.backend.exception.ProjectNumberAlreadyExistsException;
import com.elca.backend.model.Project;

import java.util.List;

public interface ProjectService {

    List<ProjectStatus> getAllProjectPreDefinedStatus();

    Project createProject(ProjectDto projectDto) throws ProjectNumberAlreadyExistsException, BadRequestException;

    Project updateProject(Long id, ProjectDto projectDto)
            throws ProjectNumberAlreadyExistsException, BadRequestException;

}
