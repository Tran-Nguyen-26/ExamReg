package com.examreg.examreg.service;

import java.util.List;

import com.examreg.examreg.dto.SubjectDTO;

public interface ISubjectService {
  SubjectDTO createSubject(SubjectDTO subjectDTO);
  SubjectDTO updateSubject(Long id, SubjectDTO subjectDTO);
  void deleteSubject(Long id);
  SubjectDTO getSubjectById(Long id);
  List<SubjectDTO> getAllSubjects();
  List<SubjectDTO> getSubjectsByExamId(Long examId);
}
