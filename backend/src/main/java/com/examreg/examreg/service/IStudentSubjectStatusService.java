package com.examreg.examreg.service;

import java.util.List;

import com.examreg.examreg.dto.response.SubjectStatusResponse;
import com.examreg.examreg.models.StudentSubjectStatus;

public interface IStudentSubjectStatusService {
  public List<StudentSubjectStatus> getStudentSubjectStatusByStudentId(Long studentId);

  public List<SubjectStatusResponse> getSubjectStatusResponse(Long studentId);
}
