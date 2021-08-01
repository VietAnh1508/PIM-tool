package com.elca.backend.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project extends AbstractEntity {

    public enum Status {
        NEW("New"),
        PLA("Planned"),
        INP("In progress"),
        FIN("Finished");

        public final String label;

        Status(String label) {
            this.label = label;
        }
    }

    @Column(unique = true)
    private Long projectNumber;

    private String name;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    private String customer;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToMany(mappedBy = "projects")
    private Set<Employee> employees = new HashSet<>();

}
