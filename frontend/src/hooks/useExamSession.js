import { examSessionService } from "../services/examSessionService"

export const useExamSession = () => {

  const getExamSessions = async () => {
    try {
      const examSessions = await examSessionService.getExamSessions()
      return examSessions
    } catch (error) {
      throw error
    }
  }

  const getExamSessionsBySubjectId = async (subjectId) => {
    try {
      const examSessions = await examSessionService.getExamSessionsBySubjectId(subjectId)
      return examSessions
    } catch (error) {
      throw error
    }
  }

  const registerExamSession = async (examSessionId) => {
    try {
      const response = await examSessionService.registerExamSession(examSessionId)
      return response
    } catch (error) {
      throw error
    }
  }

  return { getExamSessions, getExamSessionsBySubjectId, registerExamSession }
}