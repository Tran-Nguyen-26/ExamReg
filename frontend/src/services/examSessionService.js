import { ExamSession } from "../models/ExamSession";
import apiCall from "../utils/api";

export const examSessionService = {
  getExamSessions: async () => {
    const response = await apiCall('/exam-sessions', {
      method: 'GET'
    })

    const examSessions = response.data.map(examSesison => ExamSession.fromJSON(examSesison));
    return examSessions;
  },

  getExamSessionsBySubjectId: async (subjectId) => {
    const response = await apiCall(`/exam-sessions/${subjectId}`, {
      method: 'GET'
    })
    const examSessions = response.data.map(es => ExamSession.fromJSON(es))
    return examSessions
  }
}