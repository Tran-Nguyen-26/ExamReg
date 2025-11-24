import { subjectStatusService } from "../services/subjectStatusService"

export const useSubjectStatus = () => {
  const getSubjectStatus = async () => {
    try {
      const subjectStatus = await subjectStatusService.getSubjectStatus()
      return subjectStatus
    } catch (error) {
      throw error
    }
  }

  return {getSubjectStatus}
}