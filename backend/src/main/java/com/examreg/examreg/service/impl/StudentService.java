package com.examreg.examreg.service.impl;

import org.springframework.stereotype.Service;

import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.repository.StudentRepository;
import com.examreg.examreg.service.IStudentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService implements IStudentService{
  
  private final StudentRepository studentRepository;

  @Override
  public Student getStudentById(Long id) {
    return studentRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
  }
  
}
