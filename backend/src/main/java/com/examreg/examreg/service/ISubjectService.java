package com.examreg.examreg.service;

import com.examreg.examreg.models.Subject;

public interface ISubjectService {
  
  public Subject getSubjectById(Long subjectId);

  public Subject getSubjectBySubjectCode(String subjectCode);
}
