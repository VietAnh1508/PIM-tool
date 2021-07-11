package com.elca.backend.service.impl;

import com.elca.backend.dto.EmployeeDto;
import com.elca.backend.exception.EmployeeVisaAlreadyExistsException;
import com.elca.backend.model.Employee;
import com.elca.backend.repository.EmployeeRepository;
import com.elca.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public void createEmployee(EmployeeDto employeeDto) throws EmployeeVisaAlreadyExistsException {
        boolean isVisaExisted = employeeRepository.existsEmployeeByVisa(employeeDto.getVisa());
        if (isVisaExisted) {
            throw new EmployeeVisaAlreadyExistsException("Given visa already existed", employeeDto.getVisa());
        }

        Employee employee = employeeDto.toEmployee();
        employeeRepository.save(employee);
    }

}
