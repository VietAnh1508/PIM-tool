package com.elca.backend.exception;

public class RecordNotFoundException extends BaseException {

    public RecordNotFoundException(String message, Object... arguments) {
        super(message, arguments);
    }

}
