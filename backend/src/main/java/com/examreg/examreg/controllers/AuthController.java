package com.examreg.examreg.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examreg.examreg.dto.request.UserLoginRequest;
import com.examreg.examreg.dto.response.ApiResponse;
import com.examreg.examreg.dto.response.AuthResponse;
import com.examreg.examreg.service.IAuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/auth")
public class AuthController {

  private final IAuthService authService;
  
  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AuthResponse<?>>> login(@RequestBody @Valid UserLoginRequest request) {
    AuthResponse<?> authResponse = authService.login(request);
    return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
  }

}
