package com.examreg.examreg.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examreg.examreg.dto.request.ChangePasswordRequest;
import com.examreg.examreg.dto.response.ApiResponse;
import com.examreg.examreg.security.user.AppUserDetails;
import com.examreg.examreg.service.IStudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/student")
public class StudentController {
  
  private final IStudentService studentService;

  @PostMapping("/change-password")
  public ResponseEntity<ApiResponse<?>> changePassword(
    @AuthenticationPrincipal AppUserDetails studentDetails,
    @RequestBody @Valid ChangePasswordRequest request
  ) {
    studentService.changePassword(studentDetails.getId(), request);
    return ResponseEntity.ok(ApiResponse.success("Password changed successfully"));
  }
}
