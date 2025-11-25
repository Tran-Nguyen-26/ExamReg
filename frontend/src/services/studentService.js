import { jsx } from "react/jsx-runtime";
import apiCall from "../utils/api";
import { StudentResponse } from "../models/Student";

export const studentService = {
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiCall('/student/change-password', {
      method: 'POST',
      body: JSON.stringify({currentPassword, newPassword})
    })
    return response.message
  },

  addStudent: async (studentData) => {
    const response = await apiCall('/student/add', {
      method: 'POST',
      body: JSON.stringify(studentData)
    })

    return StudentResponse.fromJSON(response.data)
  }
}