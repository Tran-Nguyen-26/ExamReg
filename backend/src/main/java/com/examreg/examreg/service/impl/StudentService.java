package com.examreg.examreg.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.request.ChangePasswordRequest;
import com.examreg.examreg.exceptions.BadRequestException;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.models.Student;
import com.examreg.examreg.repository.StudentRepository;
import com.examreg.examreg.service.IStudentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService implements IStudentService{
  
  private final StudentRepository studentRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public Student getStudentById(Long id) {
    return studentRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
  }

  @Override
  public void changePassword(Long studentId, ChangePasswordRequest request) {
    Student student = getStudentById(studentId);
    if (!passwordEncoder.matches(request.getCurrentPassword(), student.getPassword())) {
      throw new BadRequestException("Current password is incorrect");
    }
    student.setPassword(passwordEncoder.encode(request.getNewPassword()));
    studentRepository.save(student);
  }
  
}
