package com.elca.backend.service;

import java.util.List;
import java.util.Set;

import com.elca.backend.dto.EmployeeDto;
import com.elca.backend.exception.BadRequestException;
import com.elca.backend.exception.EmployeeVisaAlreadyExistsException;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Employee;

public interface EmployeeService {

	Employee getEmployeeById(Long id) throws RecordNotFoundException;

	List<Employee> searchEmployees(String searchText);

	Set<Employee> getEmployeeByListVisa(Set<String> visa);

    Employee createEmployee(EmployeeDto employeeDto) throws EmployeeVisaAlreadyExistsException;

    Employee updateEmployee(Long id, EmployeeDto employeeDto)
			throws BadRequestException, EmployeeVisaAlreadyExistsException;

}
