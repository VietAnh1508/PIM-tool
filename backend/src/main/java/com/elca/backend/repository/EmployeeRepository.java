package com.elca.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.elca.backend.dto.Leader;
import com.elca.backend.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findEmployeeByIdAndVisa(Long id, String visa);

    Optional<Employee> findEmployeeByVisa(String visa);

    boolean existsEmployeeByVisa(String visa);

    List<Leader> findAllBy();

}
