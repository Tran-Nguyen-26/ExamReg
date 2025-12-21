
export const importLogService = {
  importStudentAccounts: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('http://localhost:8080/api/v1/import/students', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
    if (!response.ok) {
      throw new Error("Import failed")
    }
    return await response.json()
  },

  importStudentsCondition: async (examId, subjectCode, file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`http://localhost:8080/api/v1/import/exam/${examId}/subjects/${subjectCode}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }))
      throw new Error(errorData.message || `Import failed with status ${response.status}`)
    }
    return await response.json()
  }
}