package com.samuel.www.utils;

import com.samuel.www.exceptions.BadRequestException;
import com.samuel.www.exceptions.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound (NotFoundException ex) {
        return ApiResponse.notFound(ex.getMessage(), null);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequest (BadRequestException ex) {
        return ApiResponse.badRequest(ex.getMessage(), null);
    }
}
