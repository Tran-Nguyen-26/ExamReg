import { ExamRegistration } from "../models/ExamRegistration";
import apiCall from "../utils/api";

export const examRegistrationService = {
  getExamRegistrations: async (examId) => {
    const response = await apiCall(`/exam-registration/exam/${examId}`, {
      method: 'GET'
    })
    const examRegistrations = response.data.map(er => ExamRegistration.fromJSON(er))
    return examRegistrations
  },

  cancelExamRegistration: async (examRegistrationId) => {
    const response = await apiCall(`/exam-registration/${examRegistrationId}`, {
      method: 'DELETE'
    })
    return response.message
  }
}