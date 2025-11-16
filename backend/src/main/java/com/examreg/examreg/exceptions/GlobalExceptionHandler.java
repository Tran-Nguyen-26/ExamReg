package com.examreg.examreg.exceptions;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.examreg.examreg.dto.response.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e, HttpServletRequest request) {
    ErrorResponse error = ErrorResponse.builder()
        .timestamp(new Date(System.currentTimeMillis()))
        .status(HttpStatus.BAD_REQUEST.value())
        .path(request.getRequestURI())
        .error("Runtime error")
        .message(e.getMessage())
        .build();
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(UsernameNotFoundException e, HttpServletRequest request) {
    ErrorResponse error = ErrorResponse.builder()
        .timestamp(new Date(System.currentTimeMillis()))
        .status(HttpStatus.NOT_FOUND.value())
        .path(request.getRequestURI())
        .error("User not found")
        .message(e.getMessage())
        .build();
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException e, HttpServletRequest request) {
    ErrorResponse error = ErrorResponse.builder()
        .timestamp(new Date(System.currentTimeMillis()))
        .status(HttpStatus.BAD_REQUEST.value())
        .path(request.getRequestURI())
        .error("Bad request")
        .message(e.getMessage())
        .build();
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException e, HttpServletRequest request) {
    ErrorResponse error = ErrorResponse.builder()
        .timestamp(new Date(System.currentTimeMillis()))
        .status(HttpStatus.NOT_FOUND.value())
        .path(request.getRequestURI())
        .error("Not found")
        .message(e.getMessage())
        .build();
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }
  
}
