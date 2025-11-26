package com.examreg.examreg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examreg.examreg.dto.SubjectDTO;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.models.Exam;
import com.examreg.examreg.models.Subject;
import com.examreg.examreg.repository.ExamRepository;
import com.examreg.examreg.repository.SubjectRepository;
import com.examreg.examreg.service.ISubjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubjectService implements ISubjectService {

  private final SubjectRepository subjectRepository;
  private final ExamRepository examRepository;

  @Override
  @Transactional
  public SubjectDTO createSubject(SubjectDTO subjectDTO) {
    Subject subject = new Subject();
    subject.setSubjectCode(subjectDTO.getSubjectCode());
    subject.setName(subjectDTO.getName());
    subject.setCreditHour(subjectDTO.getCreditHour());
    subject.setDuration(subjectDTO.getDuration());

    if (subjectDTO.getExamId() != null) {
      Exam exam = examRepository.findById(subjectDTO.getExamId())
          .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + subjectDTO.getExamId()));
      subject.setExam(exam);
    }

    Subject savedSubject = subjectRepository.save(subject);
    return mapToDTO(savedSubject);
  }

  @Override
  @Transactional
  public SubjectDTO updateSubject(Long id, SubjectDTO subjectDTO) {
    Subject subject = subjectRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));

    subject.setSubjectCode(subjectDTO.getSubjectCode());
    subject.setName(subjectDTO.getName());
    subject.setCreditHour(subjectDTO.getCreditHour());
    subject.setDuration(subjectDTO.getDuration());

    if (subjectDTO.getExamId() != null) {
      Exam exam = examRepository.findById(subjectDTO.getExamId())
          .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + subjectDTO.getExamId()));
      subject.setExam(exam);
    } else {
      subject.setExam(null);
    }

    Subject updatedSubject = subjectRepository.save(subject);
    return mapToDTO(updatedSubject);
  }

  @Override
  @Transactional
  public void deleteSubject(Long id) {
    Subject subject = subjectRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));
    subjectRepository.delete(subject);
  }

  @Override
  public SubjectDTO getSubjectById(Long id) {
    Subject subject = subjectRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));
    return mapToDTO(subject);
  }

  @Override
  public List<SubjectDTO> getAllSubjects() {
    return subjectRepository.findAll().stream()
        .map(this::mapToDTO)
        .collect(Collectors.toList());
  }

  @Override
  public List<SubjectDTO> getSubjectsByExamId(Long examId) {
    return subjectRepository.findAll().stream()
        .filter(subject -> subject.getExam() != null && subject.getExam().getId().equals(examId))
        .map(this::mapToDTO)
        .collect(Collectors.toList());
  }

  private SubjectDTO mapToDTO(Subject subject) {
    return SubjectDTO.builder()
        .id(subject.getId())
        .subjectCode(subject.getSubjectCode())
        .name(subject.getName())
        .creditHour(subject.getCreditHour())
        .duration(subject.getDuration())
        .examId(subject.getExam() != null ? subject.getExam().getId() : null)
        .build();
  }
}
