import { SubjectStatus } from "../models/SubjectStatus"
import apiCall from "../utils/api"

export const subjectStatusService = {
  getSubjectStatus: async (e) => {
    const response = await apiCall('/subject-status', {
      method: 'GET'
    })
    const subjectStatus = response.data.map(ss => SubjectStatus.fromJSON(ss))
    return subjectStatus
  }
}