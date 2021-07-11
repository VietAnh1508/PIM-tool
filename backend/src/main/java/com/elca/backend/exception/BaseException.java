package com.elca.backend.exception;

import java.util.Arrays;

public class BaseException extends Exception {

    protected final Object[] params;

    public BaseException(String message, Object... arguments) {
        super(message);
        this.params = arguments;
    }

    @Override
    public String toString() {
        return super.toString() + Arrays.toString(params);
    }

}
