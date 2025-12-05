package com.examreg.examreg.service;

import java.util.List;

import com.examreg.examreg.dto.response.ExamSessionResponse;
import com.examreg.examreg.dto.response.SubjectStatusResponse;
import com.examreg.examreg.dto.request.CreateExamSessionRequest;
import com.examreg.examreg.dto.request.UpdateExamSessionRequest;

public interface IExamSessionService {
  public List<ExamSessionResponse> getExamSessionResponses(Long studentId, Long examId);

  public List<ExamSessionResponse> getExamSessionResponsesBySubjectId(Long studentId, Long subjectId, Long examId);

  public void registerExamSession(Long examSessionId, Long studentId);

  public List<SubjectStatusResponse> getStatusRegisterResponses(Long studentId, Long examId);

  ExamSessionResponse createExamSession(CreateExamSessionRequest request);

  List<ExamSessionResponse> getExamSessionsBySubjectAndExam(Long subjectId, Long examId);

  ExamSessionResponse updateExamSession(Long id, UpdateExamSessionRequest request);

  void deleteExamSession(Long id);
}
