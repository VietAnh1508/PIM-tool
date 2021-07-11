package com.elca.backend.exception.hanlder;

import com.elca.backend.exception.model.ErrorResponse;
import com.elca.backend.exception.EmployeeVisaAlreadyExistsException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<String> errors = new ArrayList<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }

        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }

        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST, "Some mandatory fields are missing", errors);
        return handleExceptionInternal(ex, errorResponse, headers, errorResponse.getStatus(), request);
    }

    @ExceptionHandler(EmployeeVisaAlreadyExistsException.class)
    private ResponseEntity<ErrorResponse> handleEmployeeVisaAlreadyExistsException(EmployeeVisaAlreadyExistsException ex) {
        List<String> errors = new ArrayList<>();
        errors.add(ex.getLocalizedMessage());
        ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST, "Bad request", errors);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
