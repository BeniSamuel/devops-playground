package com.samuel.www.utils;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@AllArgsConstructor
public class ApiResponse <T> {
    public boolean success;
    public String message;
    public T data;

    public static <T> ResponseEntity<ApiResponse<T>> ok (String message, T data) {
        return ResponseEntity.ok(new ApiResponse<>(true, message, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> created (String message, T data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, message, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> notFound (String message, T data) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, message, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> badRequest (String message, T data) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(false, message, data));
    }
}