import { createContext, useEffect, useState } from "react";

const MyContext = createContext();

export const Provider = ({children}) => {

  const [user, setUser] = useState(null)

  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedExamSession, setSelectedExamSession] = useState(null)

  const [examRegistrations, setExamRegistrations] = useState([])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const values = {
    user,
    setUser,
    selectedSubject,
    setSelectedSubject,
    selectedLocation,
    setSelectedLocation,
    selectedExamSession,
    setSelectedExamSession,
    examRegistrations,
    setExamRegistrations
  }

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  )
}

export default MyContext;