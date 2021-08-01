package com.elca.backend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.elca.backend.dto.EmployeeDto;
import com.elca.backend.exception.EmployeeVisaAlreadyExistsException;
import com.elca.backend.exception.RecordNotFoundException;
import com.elca.backend.model.Employee;
import com.elca.backend.repository.EmployeeRepository;
import com.elca.backend.service.EmployeeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/employee")
@Tag(name = "Employee")
@AllArgsConstructor
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final EmployeeService employeeService;

    @GetMapping
    @ResponseBody
    @Operation(summary = "Get all employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/leaders")
    @ResponseBody
    @Operation(summary = "Get all employees for leader")
    public List<Leader> getLeaders() {
        return employeeRepository.getLeaderBy();
    }

    @GetMapping("/{id}")
    @ResponseBody
    @Operation(summary = "Get employee by id")
    public Employee getEmployeeById(@PathVariable Long id) throws RecordNotFoundException {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create new employee")
    public Employee createNewEmployee(@Valid @RequestBody EmployeeDto employeeDto)
            throws EmployeeVisaAlreadyExistsException {
        return employeeService.createEmployee(employeeDto);
    }

    @PutMapping("/{id}")
    @ResponseBody
    @Operation(summary = "Update employee")
    public Employee updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDto employeeDto)
            throws BadRequestException, EmployeeVisaAlreadyExistsException {
        return employeeService.updateEmployee(id, employeeDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete employee")
    public void deleteEmployee(@PathVariable Long id) {
        employeeRepository.deleteById(id);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete employees")
    public void deleteEmployees(List<Long> ids) {
        employeeRepository.deleteAllById(ids);
    }

}
