import Header from "../../../components/student/header/Header";
import Notification from "../../../components/student/notification/Notification";
import Subject from "../../../components/student/subject/Subject";
import './Style-Home.css'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useExamSession } from "../../../hooks/useExamSession";
import { useSubjectStatus } from "../../../hooks/useSubjectStatus";

const Home = () => {

  const { getSubjectStatus } = useSubjectStatus()
  const { getExamSessions } = useExamSession()
  const [examSessions, setExamSessions] = useState([])
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjects = await getSubjectStatus()
        setSubjects(subjects)
      } catch (error) {
        console.error("Failed to load subject status", error)
      }
    }
    fetchData()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 0.4 }}
    >
    <div className="home-container">
      <Header/>
      <div className="notification-wrapper">
        <Notification/>
      </div>
      <div className="subjects">
        {
          subjects.map(subject => (
            <Subject key={subject.id} data={subject} />
          ))
        }
      </div>
    </div>
    </motion.div>
  )
}

export default Home;