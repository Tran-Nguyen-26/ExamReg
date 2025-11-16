package com.examreg.examreg.service.impl;

import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.request.ChangePasswordFirstimeRequest;
import com.examreg.examreg.dto.request.UserLoginRequest;
import com.examreg.examreg.dto.response.AdminReponse;
import com.examreg.examreg.dto.response.AuthResponse;
import com.examreg.examreg.dto.response.StudentResponse;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.mapper.AdminMapper;
import com.examreg.examreg.mapper.StudentMapper;
import com.examreg.examreg.models.Admin;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.repository.AdminRepositoty;
import com.examreg.examreg.repository.StudentRepository;
import com.examreg.examreg.security.jwt.JwtUtils;
import com.examreg.examreg.security.user.AppUserDetails;
import com.examreg.examreg.service.IAuthService;
import com.examreg.examreg.service.IBlacklistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;
  private final StudentRepository studentRepository;
  private final AdminRepositoty adminRepositoty;
  private final StudentMapper studentMapper;
  private final AdminMapper adminMapper;
  private final PasswordEncoder passwordEncoder;
  private final IBlacklistService blacklistService;
  
  @Override
  public AuthResponse<?> login(UserLoginRequest request) {
    Authentication authentication = authenticationManager
      .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    AppUserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
    String role = userDetails.getAuthority().getAuthority();

    String token = jwtUtils.generateTokenForUser(authentication);
    if ("ROLE_STUDENT".equals(role)) {
      Student student = studentRepository.findById(userDetails.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + userDetails.getId()));
      StudentResponse studentResponse = studentMapper.buildStudentReponse(student);
      return AuthResponse.<StudentResponse>builder()
        .token(token)
        .user(studentResponse)
        .build();
    } else if ("ROLE_AMDIN".equals(role)) {
      Admin admin = adminRepositoty.findById(userDetails.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Admin not found: " + userDetails.getId()));
      AdminReponse adminReponse = adminMapper.buildAdminReponse(admin);
      return AuthResponse.<AdminReponse>builder()
        .token(token)
        .user(adminReponse)
        .build();
    } else {
      throw new IllegalStateException("Unknown role: " + role);
    }
  }

  @Override
  public void changePasswordFirstTime(Long studentId, ChangePasswordFirstimeRequest request) {

    Student student = studentRepository.findById(studentId)
      .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentId));
    
    if (student.isFirstLogin()) {
      student.setPassword(passwordEncoder.encode(request.getPassword()));
      student.setFirstLogin(false);
      studentRepository.save(student);
    } else {
      throw new IllegalStateException("Password change not allowed: user has already logged in before");
    }
    
  }

  @Override
  public void logout(String token) {
    String jti = jwtUtils.getJtiFromToken(token);
    Date expirationDate = jwtUtils.getExpirationTimeFromToken(token);

    long remainingMs = expirationDate.getTime() - System.currentTimeMillis();

    if (remainingMs > 0) {
      blacklistService.addToBlacklist(jti, remainingMs);
    }
  }
  
}
