import { ExamRegistration } from "../models/ExamRegistration";
import apiCall from "../utils/api";

export const examRegistrationService = {
  getExamRegistrations: async () => {
    const response = await apiCall('/exam-registration', {
      method: 'GET'
    })
    const examRegistrations = response.data.map(er => ExamRegistration.fromJSON(er))
    return examRegistrations
  }
}