import { createContext, useState } from "react";

//mockdata
import subjectData from '../data/SubjectData.json'

const MyContext = createContext();

export const Provider = ({children}) => {

  console.log(subjectData)

  //fakedata
  const [subjects] = useState(subjectData)
  //

  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedExamSession, setSelectedExamSession] = useState(null)
  

  const values = {
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