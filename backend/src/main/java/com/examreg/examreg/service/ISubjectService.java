package com.examreg.examreg.service;

import java.util.List;

import com.examreg.examreg.dto.request.SubjectRequest;
import com.examreg.examreg.dto.response.SubjectResponse;
import com.examreg.examreg.models.Subject;

public interface ISubjectService {
  SubjectResponse createSubject(SubjectRequest subject);
  SubjectResponse updateSubject(Long id, SubjectRequest request);
  void deleteSubject(Long id);
  Subject getSubjectById(Long id);
  List<SubjectResponse> getAllSubjects();
  List<SubjectResponse> getSubjectsByExamId(Long examId);
}
