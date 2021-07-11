package com.elca.backend.service.impl;

import com.elca.backend.dto.ProjectStatus;
import com.elca.backend.model.Project;
import com.elca.backend.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Override
    public List<ProjectStatus> getAllProjectPreDefinedStatus() {
        return Arrays.stream(Project.Status.values())
                .map(value -> new ProjectStatus(value.name(), value.label))
                .collect(Collectors.toList());
    }

}
