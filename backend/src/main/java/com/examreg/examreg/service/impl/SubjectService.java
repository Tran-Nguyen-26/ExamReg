package com.examreg.examreg.service.impl;

import org.springframework.stereotype.Service;

import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.models.Subject;
import com.examreg.examreg.repository.SubjectRepository;
import com.examreg.examreg.service.ISubjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubjectService implements ISubjectService {
  
  private final SubjectRepository subjectRepository;

  @Override
  public Subject getSubjectById(Long subjectId) {
    return subjectRepository.findById(subjectId)
      .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
  }

  @Override
  public Subject getSubjectBySubjectCode(String subjectCode) {
    return subjectRepository.findBySubjectCode(subjectCode)
      .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
  }
}
