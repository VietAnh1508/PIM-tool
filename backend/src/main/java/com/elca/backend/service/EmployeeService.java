package com.elca.backend.service;

import com.elca.backend.dto.EmployeeDto;
import com.elca.backend.exception.EmployeeVisaAlreadyExistsException;

public interface EmployeeService {

    void createEmployee(EmployeeDto employeeDto) throws EmployeeVisaAlreadyExistsException;

}
