import apiCall from "../utils/api";

export const studentService = {
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiCall('/student/change-password', {
      method: 'POST',
      body: JSON.stringify({currentPassword, newPassword})
    })
    return response.message
  }
}