package com.elca.backend.service;

import com.elca.backend.dto.ProjectStatus;

import java.util.List;

public interface ProjectService {

    List<ProjectStatus> getAllProjectPreDefinedStatus();

}
