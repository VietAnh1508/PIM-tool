package com.elca.backend.repository;

import org.springframework.data.jpa.domain.Specification;

import com.elca.backend.model.Employee;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EmployeeSpecification {

	public static Specification<Employee> visaEqual(String searchText) {
		return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("visa"), searchText);
	}

	public static Specification<Employee> nameContains(String searchText) {
		return (root, criteriaQuery, criteriaBuilder) ->
				criteriaBuilder.or(
						criteriaBuilder.like(root.get("firstName"), "%" + searchText + "%"),
						criteriaBuilder.like(root.get("lastName"), "%" + searchText + "%")
				);
	}

}
