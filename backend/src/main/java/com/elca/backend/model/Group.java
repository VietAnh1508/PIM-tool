package com.elca.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "group_table")
@Getter
@Setter
public class Group extends AbstractEntity {

    @OneToOne
    @JoinColumn(name = "group_leader_id")
    private Employee leader;

    @OneToMany(mappedBy = "group")
    private List<Project> projects;

}
