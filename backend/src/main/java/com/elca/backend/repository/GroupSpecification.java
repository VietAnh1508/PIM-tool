package com.elca.backend.repository;

import javax.persistence.criteria.Join;

import org.springframework.data.jpa.domain.Specification;

import com.elca.backend.model.Employee;
import com.elca.backend.model.Group;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GroupSpecification {

	public static Specification<Group> nameContains(String text) {
		return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get(Group.NAME), "%" + text + "%");
	}

	public static Specification<Group> leaderNameContains(String text) {
		return (root, criteriaQuery, criteriaBuilder) -> {
			final Join<Group, Employee> leader = root.join(Group.LEADER);
			return criteriaBuilder.or(
					criteriaBuilder.like(leader.get(Employee.FIRST_NAME), "%" + text + "%"),
					criteriaBuilder.like(leader.get(Employee.LAST_NAME), "%" + text + "%")
			);
		};
	}

}
