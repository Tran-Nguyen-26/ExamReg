package com.examreg.examreg.service.impl;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.examreg.examreg.dto.request.ExamRequest;
import com.examreg.examreg.dto.response.ExamResponse;
import com.examreg.examreg.exceptions.ResourceNotFoundException;
import com.examreg.examreg.models.Exam;
import com.examreg.examreg.models.Subject;
import com.examreg.examreg.mapper.ExamMapper;
import com.examreg.examreg.repository.ExamRepository;
import com.examreg.examreg.service.IExamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService implements IExamService {
    private final ExamRepository examRepository;
    private final ExamMapper examMapper;

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
}
