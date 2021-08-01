package com.elca.backend.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.elca.backend.model.Group;
import com.elca.backend.model.Project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {

    @NotNull
    private Long number;

    @NotBlank
    private String name;

    @NotNull
    private Long groupId;

    @NotBlank
    private String customer;

    @NotNull
    private Project.Status status;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    public Project toProject(Group group) {
        return Project.builder()
                .projectNumber(this.number)
                .name(this.name)
                .group(group)
                .customer(this.customer)
                .status(this.status)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }

}
