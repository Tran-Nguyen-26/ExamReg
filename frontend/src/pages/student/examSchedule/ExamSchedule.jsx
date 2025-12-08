import Header from "../../../components/student/header/Header"
import Schedule from "../../../components/student/schedule/Schedule"
import './Style-ExamSchedule.css'
import { motion } from "framer-motion"

import { useContext, useEffect, useRef, useState } from "react"
import { useExamRegistration } from "../../../hooks/useExamRegistration"
import MyContext from "../../../context/MyContext"
import Ticket from "../../../components/student/ticket/Ticket"

const ExamSchedule = () => {

  const ticketRef = useRef()

  const { getExamRegistrations, cancelExamRegistration } = useExamRegistration()
  const {
    openExam,
    examRegistrations, 
    setExamRegistrations,
    setSelectedSubject,
    setSelectedLocation,
    selectedExamSession,
    setSelectedExamSession
  } = useContext(MyContext)

  const handleDownloadFromSchedule = (examRegistration) => {
    setSelectedExamSession(examRegistration.examSession)
    setSelectedLocation(examRegistration.examSession.room.location)
    setSelectedSubject(examRegistration.examSession.subjectStatus.subject)
    setTimeout(() => {
      if (ticketRef.current) {
        ticketRef.current.download()
      }
    }, 300)
  }

  const handlePrintFromSchedule = (examRegistration) => {
    setSelectedExamSession(examRegistration.examSession)
    setSelectedLocation(examRegistration.examSession.room.location)
    setSelectedSubject(examRegistration.examSession.subjectStatus.subject)
    setTimeout(() => {
      if (ticketRef.current) {
        ticketRef.current.print()
      }
    }, 300)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const examRegistrations = await getExamRegistrations(openExam.id)
        setExamRegistrations(examRegistrations)
      } catch (error) {
        console.error("Failed to load exam registrations", error)
      }
    }
    fetchData()
  }, [openExam.id])

  const handleCancel = async (examRegistrationId) => {
    try {
      await cancelExamRegistration(examRegistrationId)
      setTimeout(() => {
        alert('Huỷ đăng kí thành công')
      }, 500)
      const updated = await getExamRegistrations(openExam.id)
      setExamRegistrations(updated)
    } catch (error) {
      console.error('Failed to cancel exam registration', error)
    }
  }

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
              onCancel={handleCancel}
              onDownload={() => handleDownloadFromSchedule(examRegistration)}
              onPrint={() => handlePrintFromSchedule(examRegistration)}
            />
          ))
        }
      </div>
    </div>
    {
      selectedExamSession && (
        <div style={{visibility:'hidden', position:'absolute', left:'-9999px'}}>
          <Ticket ref={ticketRef}/>
        </div>
      )
    }
    </motion.div>
  )
}

export default ExamSchedule