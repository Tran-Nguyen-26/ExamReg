import { createContext, useEffect, useState } from "react";
import { useExamSession } from "../hooks/useExamSession";

const ExamSessionContext = createContext()

export const ExamSessionProvider = ({ children }) => {
  const { getExamSessions } = useExamSession()
  const [examSessions, setExamSessions] = useState([])
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examSessions = await getExamSessions()
        setExamSessions(examSessions)

        const subjects = Array.from(
          new Map(examSessions.map(s => [s.subject.id, s.subject])).values()
        )
        setSubjects(subjects)
      } catch (error) {
        console.error("Failed to load exam sessions", error)
      }
    }
    fetchData()
  }, [])

  return (
    <ExamSessionContext.Provider values={{examSessions, subjects}}>
      {children}
    </ExamSessionContext.Provider>
  )
}

export default ExamSessionContext