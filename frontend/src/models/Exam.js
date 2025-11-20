export class ExamResponse {
  constructor({ id, examName, startDate, endDate, examStatus, description }) {
    this.id = id
    this.examName = examName
    this.startDate = startDate
    this.endDate = endDate
    this.examStatus = examStatus
    this.description = description
  }

  static fromJSON(json) {
    return new ExamResponse(json)
  }
}
