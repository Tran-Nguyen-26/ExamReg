package com.examreg.examreg.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examreg.examreg.dto.response.ApiResponse;
import com.examreg.examreg.dto.response.SubjectStatusResponse;
import com.examreg.examreg.security.user.AppUserDetails;
import com.examreg.examreg.service.IExamSessionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/subject-status")
public class SubjectStatusController {

  private final IExamSessionService examSessionService;
  
  @GetMapping("/exam/{examId}")
  public ResponseEntity<ApiResponse<List<SubjectStatusResponse>>> getSubjectStatusResponses(
    @AuthenticationPrincipal AppUserDetails studentDetails,
    @PathVariable Long examId
  ) {
    List<SubjectStatusResponse> responses = examSessionService.getStatusRegisterResponses(studentDetails.getId(), examId);
    return ResponseEntity.ok(ApiResponse.success("Get subject status successful", responses));
  }
}
