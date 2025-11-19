import Header from "../../../components/student/header/Header"
import Schedule from "../../../components/student/schedule/Schedule"
import './Style-ExamSchedule.css'
import { motion } from "framer-motion"

//fake data
import examRegistrationData from '../../../data/ExamRegistrationData.json'
import { useEffect, useState } from "react"
import { useExamRegistration } from "../../../hooks/useExamRegistration"

const ExamSchedule = () => {

  const { getExamRegistrations } = useExamRegistration()
  const [examRegistrations, setExamRegistrations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examRegistrations = await getExamRegistrations()
        setExamRegistrations(examRegistrations)
      } catch (error) {
        console.error("Failed to load exam registrations", error)
      }
    }
    fetchData()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
    <div className="exam-schedule">
      <Header/>
      <div className="schedule-header">
        <div className="part1">
          <h2>Lịch thi của tôi</h2>
          <p>Danh sách các ca thi bạn đã đăng ký</p>
        </div>
        <div className="part2">
          <h1>{examRegistrations.length}</h1>
          <p>Môn thi</p>
        </div>
      </div>
      <div className="main-card">
        {
          examRegistrations.map((examRegistration) => (
            <Schedule
              key={examRegistration.id}
              data={examRegistration}
            />
          ))
        }
      </div>
    </div>
    </motion.div>
  )
}

export default ExamSchedule