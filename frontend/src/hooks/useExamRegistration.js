import { examRegistrationService } from "../services/examRegistrationService"

export const useExamRegistration = () => {
  const getExamRegistrations = async () => {
    try {
      const examRegistrations = await examRegistrationService.getExamRegistrations()
      return examRegistrations;
    } catch (error) {
      throw error
    }
  }

  const cancelExamRegistration = async (examRegistrationId) => {
    try {
      const message = await examRegistrationService.cancelExamRegistration(examRegistrationId)
      return message
    } catch (error) {
      throw error
    }
  }

  return { getExamRegistrations, cancelExamRegistration }
}