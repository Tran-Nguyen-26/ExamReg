import { ExamSession } from "../models/ExamSession";
import apiCall from "../utils/api";

export const examSessionService = {
  getExamSessions: async (examId) => {
    const response = await apiCall(`/exam-sessions/exam/${examId}`, {
      method: 'GET'
    })

    const examSessions = response.data.map(examSesison => ExamSession.fromJSON(examSesison));
    return examSessions;
  },

  getExamSessionsBySubjectId: async (subjectId, examId) => {
    const response = await apiCall(`/exam-sessions/by-subject/${subjectId}/by-exam/${examId}`, {
      method: 'GET'
    })
    const examSessions = response.data.map(es => ExamSession.fromJSON(es))
    return examSessions
  },

  registerExamSession: async (examSessionId) => {
    const response = await apiCall(`/exam-sessions/${examSessionId}/register`, {
      method: 'POST'
    })
    return response.message
  }
}