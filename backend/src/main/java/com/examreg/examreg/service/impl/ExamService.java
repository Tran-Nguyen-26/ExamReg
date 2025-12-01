package com.examreg.examreg.service.impl;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.examreg.examreg.dto.request.ExamRequest;
import com.examreg.examreg.dto.response.ExamResponse;
import com.examreg.examreg.exceptions.BadRequestException;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.models.Exam;
import com.examreg.examreg.models.Subject;
import com.examreg.examreg.mapper.ExamMapper;
import com.examreg.examreg.repository.ExamRepository;
import com.examreg.examreg.repository.SubjectRepository;
import com.examreg.examreg.service.IExamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService implements IExamService {

    private final ExamRepository examRepository;
    private final ExamMapper examMapper;
    private final SubjectRepository subjectRepository;

    @Override
    @Transactional
    public ExamResponse createExam(ExamRequest request) {
        validateDate(request);
        Exam exam = new Exam();
        exam.setExamName(request.getExamName());
        exam.setStartDate(request.getStartDate());
        exam.setEndDate(request.getEndDate());
        exam.setDescription(request.getDescription());
        exam.setExamStatus("upcoming");
        
        Exam savedExam = examRepository.save(exam);

        return examMapper.buildExamResponse(savedExam);
    }

    @Override
    public List<ExamResponse> getAllExams() {
        List<Exam> exams = examRepository.findAll();
        return exams.stream()
                .map(examMapper::buildExamResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ExamResponse updateExam(Long id, ExamRequest request) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + id));

        exam.setExamName(request.getExamName());
        exam.setStartDate(request.getStartDate());
        exam.setEndDate(request.getEndDate());
        exam.setDescription(request.getDescription());

        Exam updatedExam = examRepository.save(exam);
        return examMapper.buildExamResponse(updatedExam);
    }

    @Override
    @Transactional
    public void deleteExam(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + id));
        
        examRepository.delete(exam);
    }

    @Override
    @Transactional
    public ExamResponse closeExam(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + id));
        
        exam.setExamStatus("closed");
        Exam closedExam = examRepository.save(exam);
        return examMapper.buildExamResponse(closedExam);
    }

    @Override
    @Transactional
    public ExamResponse openExam(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + id));
        
        exam.setExamStatus("active");
        Exam openedExam = examRepository.save(exam);
        return examMapper.buildExamResponse(openedExam);
    }

    private void validateDate(ExamRequest request) {
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new IllegalArgumentException("Ngày bắt đầu phải trước ngày kết thúc!");
        }
    }

    @Override
    public Exam getExamById(Long id) {
        return examRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + id));
    }

    @Override
    public Exam getExamByExamCode(String examCode) {
        return examRepository.findByExamCode(examCode)
            .orElseThrow(() -> new ResourceNotFoundException("Exam not found"));
    }

    @Override
    public ExamResponse getExamIsOpen() {
        return examMapper.buildExamResponse(examRepository.findByIsOpenTrue());
    }

    @Override
    public void addSubjectsToExam(Long examId, List<Long> subjectIds) {
        Exam exam = getExamById(examId);
        List<Long> alreadySubjectIds = exam.getSubjects()
            .stream()
            .map(Subject::getId)
            .collect(Collectors.toList());
        
        if (exam.getSubjects() == null) {
            exam.setSubjects(new ArrayList<>());
        }
    
        for (Long subjectId : subjectIds) {
            if (alreadySubjectIds.contains(subjectId)) {
                throw new BadRequestException("Đã tồn tại môn học có id " + subjectId + " trong kì thi");
            }
            Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + subjectId));  
            exam.getSubjects().add(subject);
        }
        examRepository.save(exam);
    }
}