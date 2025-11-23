package com.examreg.examreg.service;

import java.util.List;

import com.examreg.examreg.dto.response.ExamSessionResponse;
import com.examreg.examreg.dto.response.SubjectStatusResponse;

public interface IExamSessionService {
  public List<ExamSessionResponse> getExamSessionResponses(Long studentId);

  public List<ExamSessionResponse> getExamSessionResponsesBySubjectId(Long studentId, Long subjectId);

  public void registerExamSession(Long examSessionId, Long studentId);

  public List<SubjectStatusResponse> getStatusRegisterResponses(Long studentId);
}
