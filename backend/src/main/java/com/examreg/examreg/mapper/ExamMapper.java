package com.examreg.examreg.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.examreg.examreg.dto.response.ExamResponse;
import com.examreg.examreg.models.Exam;

@Component
public class ExamMapper {
    public ExamResponse buildExamResponse(Exam exam) {
        return ExamResponse.builder()
        .id(exam.getId())
        .examName(exam.getExamName())
        .startDate(exam.getStartDate())
        .endDate(exam.getEndDate())
        .examSatus(exam.getExamStatus())
        .description(exam.getDescription())
        .build();
    }
}
