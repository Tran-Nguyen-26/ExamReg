import { subjectStatusService } from "../services/subjectStatusService"

export const useSubjectStatus = () => {
  const getSubjectStatus = async (examId) => {
    try {
      const subjectStatus = await subjectStatusService.getSubjectStatus(examId)
      return subjectStatus
    } catch (error) {
      throw error
    }
  }

  return {getSubjectStatus}
}