package com.elca.backend.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elca.backend.dto.EmployeeDto;
import com.elca.backend.exception.EmployeeVisaAlreadyExistsException;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Employee;
import com.elca.backend.repository.EmployeeRepository;
import com.elca.backend.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(EmployeeDto employeeDto) throws EmployeeVisaAlreadyExistsException {
        boolean isVisaExisted = employeeRepository.existsEmployeeByVisa(employeeDto.getVisa());
        if (isVisaExisted) {
            throw new EmployeeVisaAlreadyExistsException("Given visa already existed", employeeDto.getVisa());
        }

        Employee employee = employeeDto.toEmployee();
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(final Long id, final EmployeeDto employeeDto)
            throws RecordNotFoundException, EmployeeVisaAlreadyExistsException {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (!employeeOptional.isPresent()) {
            throw new RecordNotFoundException("Employee not found with id: " + id);
        }

        Optional<Employee> employeeByVisa = employeeRepository.findEmployeeByVisa(employeeDto.getVisa());
        if (employeeByVisa.isPresent() && !employeeByVisa.get().getId().equals(id)) {
            throw new EmployeeVisaAlreadyExistsException("Given visa already existed", employeeDto.getVisa());
        }

        return employeeOptional
                .map(employee -> {
                    employee.setVisa(employeeDto.getVisa());
                    employee.setFirstName(employeeDto.getFirstName());
                    employee.setLastName(employeeDto.getLastName());
                    employee.setBirthDate(employeeDto.getBirthDate());
                    return employeeRepository.save(employee);
                })
                .orElse(null);
    }

}
