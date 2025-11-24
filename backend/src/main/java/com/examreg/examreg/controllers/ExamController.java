package com.examreg.examreg.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.examreg.examreg.dto.request.ExamRequest;
import com.examreg.examreg.dto.response.ApiResponse;
import com.examreg.examreg.dto.response.ExamResponse;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.models.Exam;
import com.examreg.examreg.security.user.AppUserDetails;
import com.examreg.examreg.service.IExamService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/exams")
public class ExamController {
    private final IExamService examService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<ExamResponse>> createExam(
            @RequestBody @Valid ExamRequest request) {

        ExamResponse response = examService.createExam(request);

        return ResponseEntity.ok(
                ApiResponse.success("Exam created successfully", response)
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<ApiResponse<List<ExamResponse>>> getAllExams() {
        List<ExamResponse> exams = examService.getAllExams();
        
        return ResponseEntity.ok(
                ApiResponse.success("Exams retrieved successfully", exams)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ExamResponse>> updateExam(
            @PathVariable Long id,
            @RequestBody @Valid ExamRequest request) {
        
        ExamResponse response = examService.updateExam(id, request);
        
        return ResponseEntity.ok(
                ApiResponse.success("Exam updated successfully", response)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        
        return ResponseEntity.ok(
                ApiResponse.success("Exam deleted successfully", null)
        );
    }

    @PutMapping("/{id}/close")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ExamResponse>> closeExam(@PathVariable Long id) {
        ExamResponse response = examService.closeExam(id);
        
        return ResponseEntity.ok(
                ApiResponse.success("Exam closed successfully", response)
        );
    }

    @PutMapping("/{id}/open")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ExamResponse>> openExam(@PathVariable Long id) {
        ExamResponse response = examService.openExam(id);
        
        return ResponseEntity.ok(
                ApiResponse.success("Exam opened successfully", response)
        );
    }
}
