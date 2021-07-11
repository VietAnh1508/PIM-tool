package com.elca.backend.exception;

public class EmployeeVisaAlreadyExistsException extends BaseException {

    public EmployeeVisaAlreadyExistsException(String message, Object... arguments) {
        super(message, arguments);
    }

}
