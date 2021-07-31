package com.elca.backend.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;

import com.elca.backend.model.Employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    @NotBlank(message = "VISA is required")
    private String visa;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    private LocalDate birthDate;

    public Employee toEmployee() {
        return Employee.builder()
                .visa(this.getVisa())
                .firstName(this.getFirstName())
                .lastName(this.getLastName())
                .birthDate(this.getBirthDate())
                .build();
    }

}
