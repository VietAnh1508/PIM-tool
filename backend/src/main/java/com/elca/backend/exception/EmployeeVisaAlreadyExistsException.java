package com.elca.backend.exception;

import java.util.Arrays;

public class EmployeeVisaAlreadyExistsException extends Exception {

    private final Object[] params;

    public EmployeeVisaAlreadyExistsException(String message, Object... arguments) {
        super(message);
        this.params = arguments;
    }

    @Override
    public String toString() {
        return super.toString() + Arrays.toString(params);
    }

}
