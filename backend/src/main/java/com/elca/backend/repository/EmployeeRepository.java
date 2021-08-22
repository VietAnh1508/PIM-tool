package com.elca.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.elca.backend.dto.Leader;
import com.elca.backend.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {

    Optional<Employee> findEmployeeByVisa(String visa);

    Set<Employee> getEmployeesByVisaIn(Set<String> listVisa);

    boolean existsEmployeeByVisa(String visa);

    List<Leader> getLeaderBy();

}
