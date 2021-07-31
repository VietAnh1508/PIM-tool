package com.elca.backend.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "group_table")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Group extends AbstractEntity {

    private String name;

    @OneToOne
    @JoinColumn(name = "group_leader_id")
    private Employee leader;

}
