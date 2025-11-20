package com.examreg.examreg.service;
import com.examreg.examreg.dto.request.ExamRequest;
import com.examreg.examreg.dto.response.ExamResponse;
import java.util.List;

public interface IExamService {
    ExamResponse createExam(ExamRequest request);

    List<ExamResponse> getAllExams();

    ExamResponse updateExam(Long id, ExamRequest request);

    void deleteExam(Long id);

    ExamResponse closeExam(Long id);

    ExamResponse openExam(Long id);
}
