package com.elca.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
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
