package com.examreg.examreg.service.impl;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

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
import com.examreg.examreg.exceptions.BadRequestException;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.mapper.AdminMapper;
import com.examreg.examreg.mapper.StudentMapper;
import com.examreg.examreg.models.Admin;
import com.examreg.examreg.models.PasswordResetToken;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.repository.AdminRepositoty;
import com.examreg.examreg.repository.ResetTokenRepository;
import com.examreg.examreg.repository.StudentRepository;
import com.examreg.examreg.security.jwt.JwtUtils;
import com.examreg.examreg.security.user.AppUserDetails;
import com.examreg.examreg.service.IAuthService;
import com.examreg.examreg.service.IBlacklistService;
import com.examreg.examreg.service.IEmailService;

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
  private final ResetTokenRepository resetTokenRepository;
  private final IEmailService emailService;
  
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
        if (student.getLoginLockedUntil() != null && 
          LocalDateTime.now().isBefore(student.getLoginLockedUntil())
        ) {
          long minutes = Duration
            .between(LocalDateTime.now(), student.getLoginLockedUntil())
            .toMinutes();
          
          throw new RuntimeException(String.format("Bạn phải đợi %d phút nữa mới được đăng nhập lại", minutes));
        }
        if (student.getLoginLockedUntil() != null && 
          LocalDateTime.now().isAfter(student.getLoginLockedUntil())
        ) {
          student.setLoginLockedUntil(null);
          studentRepository.save(student);
        }
      StudentResponse studentResponse = studentMapper.buildStudentReponse(student);
      return AuthResponse.<StudentResponse>builder()
        .token(token)
        .user(studentResponse)
        .build();
    } else if ("ROLE_ADMIN".equals(role)) {
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

    AppUserDetails studentDetails = (AppUserDetails)SecurityContextHolder
      .getContext()
      .getAuthentication()
      .getPrincipal();
    
    if ("ROLE_STUDENT".equals(studentDetails.getAuthority().getAuthority())) {
      Student student= studentRepository.findById(studentDetails.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
      
      student.setLoginLockedUntil(LocalDateTime.now().plusMinutes(20));
      studentRepository.save(student);
    }
  }

  @Override
  public void sendResetPasswordLink(String email) {
    Student student = studentRepository.findByEmail(email)
      .orElse(null);
    Admin admin = adminRepositoty.findByEmail(email)
      .orElse(null);
    if (student == null && admin == null) {
      throw new BadRequestException("Email không tồn tại");
    }
    String token = UUID.randomUUID().toString();
    String hashedToken = passwordEncoder.encode(token);
    PasswordResetToken entity = PasswordResetToken.builder()
      .student(student)
      .admin(admin)
      .token(hashedToken)
      .expiryDate(LocalDateTime.now().plusMinutes(15))
      .build();
    resetTokenRepository.save(entity);
    String link = "http://localhost:5173/login?token=" + token;
    String emailContent = buildEmailContent(link);
    emailService.send(email, "ExamReg: Reset your password", emailContent);
  }

  private String buildEmailContent(String link) {
    return """
      <h2>Reset your password</h2>
      <p>Click the link below để cập nhật mật khẩu:</p>
      <a href="%s" target="_self">Reset Password</a>
    """.formatted(link);
  }

  @Override
  public void updatePassword(String token, String newPassword) {
    PasswordResetToken resetToken = resetTokenRepository.findAll()
      .stream()
      .filter(t -> passwordEncoder.matches(token, t.getToken()))
      .findFirst()
      .orElseThrow(() -> new BadRequestException("Invalid reset token"));
    if (resetToken.getStudent() != null) {
      Student student = resetToken.getStudent();
      student.setPassword(passwordEncoder.encode(newPassword));
      studentRepository.save(student);
    } else {
      Admin admin = resetToken.getAdmin();
      admin.setPassword(passwordEncoder.encode(newPassword));
      adminRepositoty.save(admin);
    }
    resetTokenRepository.delete(resetToken);
  }
  
}
