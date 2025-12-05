package com.examreg.examreg.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.examreg.examreg.dto.response.ExamSessionResponse;
import com.examreg.examreg.enums.ExamSessionStatus;
import com.examreg.examreg.models.Exam;
import com.examreg.examreg.models.ExamSession;
import com.examreg.examreg.models.StudentSubjectStatus;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ExamSessionMapper {

  private final RoomMapper roomMapper;
  private final SubjectMapper subjectMapper;
  private final ExamMapper examMapper;
  private final SubjectStatusMapper statusMapper;

  public ExamSessionResponse buildExamSessionResponse(ExamSession examSession) {
    return ExamSessionResponse.builder()
      .id(examSession.getId())
      .date(examSession.getDate())
      .capacity(examSession.getCapacity())
      .startTime(examSession.getStartTime())
      .registeredCount(examSession.getRegisteredCount())
      .isFull(examSession.isFull())
      .subjectId(examSession.getSubject().getId())
      .subjectCode(examSession.getSubject().getSubjectCode())
      .subjectName(examSession.getSubject().getName())
      .roomId(examSession.getRoom().getId())
      .roomName(examSession.getRoom().getName())
      .locationId(examSession.getRoom().getLocation().getId())
      .locationName(examSession.getRoom().getLocation().getName())
      .examId(examSession.getExam().getId())
      .examName(examSession.getExam().getExamName())
      .build();
  }

  public ExamSessionResponse buildExamSessionResponse(
    ExamSession examSession, 
    int registeredCount, 
    ExamSessionStatus status
  ) {
    ExamSessionResponse response = buildExamSessionResponse(examSession);
    response.setRegisteredCount(registeredCount);
    response.setStatus(status);
    return response;
  }

  public List<ExamSessionResponse> buildExamSessionResponsesList(List<ExamSession> examSessions) {
    return examSessions.stream().map(this::buildExamSessionResponse).toList();
  }

  public ExamSessionResponse buildExamSessionResponse(ExamSession examSession, StudentSubjectStatus ssStatus) {
    ExamSessionResponse response = buildExamSessionResponse(examSession);
    response.setSubjectStatus(statusMapper.buildSubjectStatusReponse(ssStatus));
    return response;
  }
}
