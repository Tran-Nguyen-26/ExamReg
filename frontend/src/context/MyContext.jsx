import { createContext, useEffect, useState } from "react";

//mockdata
import subjectData from '../data/SubjectData.json'

const MyContext = createContext();

export const Provider = ({children}) => {

  const [user, setUser] = useState(null)

  //fakedata
  const [subjects] = useState(subjectData)
  //

  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedExamSession, setSelectedExamSession] = useState(null)

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
    subjects,
    selectedLocation,
    setSelectedLocation,
    selectedExamSession,
    setSelectedExamSession
  }

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  )
}

export default MyContext;