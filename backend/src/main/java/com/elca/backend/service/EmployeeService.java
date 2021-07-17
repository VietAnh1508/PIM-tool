package com.elca.backend.service;

import com.elca.backend.dto.EmployeeDto;
import com.elca.backend.exception.EmployeeVisaAlreadyExistsException;
import com.elca.backend.exception.RecordNotFoundException;

public interface EmployeeService {

    void createEmployee(EmployeeDto employeeDto) throws EmployeeVisaAlreadyExistsException;

    void editEmployee(Long id, EmployeeDto employeeDto)
			throws RecordNotFoundException, EmployeeVisaAlreadyExistsException;

}
