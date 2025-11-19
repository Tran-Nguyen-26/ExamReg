package com.examreg.examreg.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examreg.examreg.dto.response.ApiResponse;
import com.examreg.examreg.dto.response.ExamSessionResponse;
import com.examreg.examreg.security.user.AppUserDetails;
import com.examreg.examreg.service.IExamSessionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/exam-sessions")
public class ExamSessionController {
  
  private final IExamSessionService examSessionService;

  @GetMapping("")
  @PreAuthorize("hasRole('STUDENT')")
  public ResponseEntity<ApiResponse<List<ExamSessionResponse>>> getAllExamSessions(
    @AuthenticationPrincipal AppUserDetails studenDetails
  ) {
    List<ExamSessionResponse> response = examSessionService.getExamSessionResponses(studenDetails.getId());
    return ResponseEntity.ok(ApiResponse
      .success("Get examsessions successful",
      response));
  }

  @GetMapping("/{subjectId}")
  public ResponseEntity<ApiResponse<List<ExamSessionResponse>>> getExamSessionsBySubjectId(
    @AuthenticationPrincipal AppUserDetails studenDetails,
    @PathVariable Long subjectId
  ) {
    List<ExamSessionResponse> response = examSessionService
      .getExamSessionResponsesBySubjectId(studenDetails.getId(), subjectId);
    return ResponseEntity.ok(ApiResponse
      .success("Get examsessions by subject successful",
      response));
  }
}
