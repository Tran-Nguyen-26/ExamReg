package com.examreg.examreg.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examreg.examreg.dto.request.AddStudentRequest;
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
  public Student getStudentByStudentCode(String studentCode) {
    return studentRepository.findByStudentCode(studentCode)
      .orElseThrow(() -> new ResourceNotFoundException("Student not found with code: " + studentCode));
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
  
  @Override
  public void addStudent(AddStudentRequest request) {
    if (studentRepository.existsByStudentCode(request.getCode())) {
      throw new BadRequestException("Đã tồn tại học sinh với mã sinh viên: " + request.getCode());
    }
    String defaultPassword = request.getEmail().substring(0, request.getEmail().indexOf("@"));

    Student student = new Student();
    student.setStudentCode(request.getCode());
    student.setFullname(request.getName());
    student.setGender(request.getGender());
    student.setDob(request.getDob());
    student.setClassName(request.getClassName());
    student.setPhone(request.getPhone());
    student.setMajor(request.getMajor());
    student.setFaculty(request.getFaculty());
    student.setEmail(request.getEmail());
    student.setPassword(passwordEncoder.encode(defaultPassword));
    student.setFirstLogin(true);

    studentRepository.save(student);
  }
}
