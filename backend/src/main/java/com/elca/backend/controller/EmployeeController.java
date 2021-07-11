package com.elca.backend.controller;

import com.elca.backend.dto.EmployeeDto;
import com.elca.backend.exception.EmployeeVisaAlreadyExistsException;
import com.elca.backend.model.Employee;
import com.elca.backend.repository.EmployeeRepository;
import com.elca.backend.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/employee")
@Tag(name = "Employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    @Operation(summary = "Get all employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by id")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        return employeeOptional
                .map(employee -> new ResponseEntity<>(employee, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @Operation(summary = "Create new employee")
    public ResponseEntity<Void> createNewEmployee(@Valid @RequestBody EmployeeDto employeeDto)
            throws EmployeeVisaAlreadyExistsException {
        employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
