import Header from '../../../components/student/header/Header';
import SelectedSubject from '../../../components/student/selectedSubject/SelectedSubject';
import './Style-ExamRegister.css'
import logo_location from '../../../assets/logo_location.png'
import Location from '../../../components/student/location/Location';
import ExamSession from '../../../components/student/examSession/ExamSession';
import logo_exam_session from '../../../assets/logo_exam_session.png'
import { useContext, useEffect, useMemo, useState } from 'react';
import SelectedLocation from '../../../components/student/selectedLocation/SelectedLocation';
import SelectExamSession from '../../../components/student/selectedExamSession/SelectedExamSession';
import Reminder from '../../../components/student/reminder/Reminder';
import { useNavigate, useParams } from 'react-router-dom';
import MyContext from '../../../context/MyContext';
import { motion, AnimatePresence } from 'framer-motion'
import Ticket from '../../../components/student/ticket/Ticket';
import { useExamSession } from '../../../hooks/useExamSession';


const ExamRegister = () => {

  const { getExamSessionsBySubjectId } = useExamSession()
  const {subjectId} = useParams()
  const [examSessions, setExamSessions] = useState([])

  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const [showLocationWarning, setShowLocationWarning] = useState(false)
  const [showExamSessionWarning, setShowExamSessionWarning] = useState(false)
  const [showTicket, setShowTicket] = useState(false)


  const {
    selectedSubject,
    selectedLocation, 
    setSelectedLocation,
    selectedExamSession,
    setSelectedExamSession
  } = useContext(MyContext)

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examSessionsBySubjectId = await getExamSessionsBySubjectId(subjectId)
        setExamSessions(examSessionsBySubjectId)
      } catch (error) {
        console.error("Failed to load exam sessions", error)
      }
    }
    fetchData()
  }, [])

  const locs = Array.from(
      new Map(examSessions.map(es => [
        es.room.location.id, 
        { ...es.room.location, status: es.status}
      ])
    ).values()
  )

  const toggleLocation = (loc) => {
    if (loc.status === "AVAILABLE") {
      selectedLocation?.id == loc.id ? setSelectedLocation(null) : setSelectedLocation(loc)
    }
  }

  const handleSelectLocationButton = () => {
    if (selectedLocation !== null) {
      setStep(step + 1)
    } else {
      setShowLocationWarning(true)
      setTimeout(() => {
        setShowLocationWarning(false)
      }, 1000)
      return
    }
  }

  const filteredSessionsBySelectedLocation = useMemo(() => {
    return examSessions.filter(es => es.room.location.id === selectedLocation?.id)
  }, [examSessions, selectedLocation])

  console.log(filteredSessionsBySelectedLocation)

  const toggleExamSession = (examSession) => {
    if (examSession.status === "AVAILABLE") {
      selectedExamSession?.id == examSession.id ? setSelectedExamSession(null) : setSelectedExamSession(examSession)
    }
  }

  const handleSelectExamSessionButton = () => {
    if (selectedExamSession !== null) {
      setStep(step + 1)
    } else {
      setShowExamSessionWarning(true)
      setTimeout(() => {
        setShowExamSessionWarning(false)
      }, 1000)
      return 
    }
  }

  const handleBtnRegister = () => {
  }


  return (
    <motion.div
      initial={{ opacity: 0, x: window.innerWidth }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`exam-register ${showTicket ? 'blurred' : ''}`}>
        <Header/>
        <SelectedSubject subject={selectedSubject}/>

        <AnimatePresence mode='wait'>
        {
          step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: window.innerWidth }}
              animate={{ opacity: 1, x: 0, transition: {duration: 0.4, delay: 0.4} }}
              exit={{ opacity: 1, x: -window.innerWidth, transition: {duration: 0.4, delay: 0}}}
            >
              <div className='select-location'>
                <div className='pos'>
                  <img src={logo_location} alt="" />
                  <span>Lựa chọn địa điểm thi</span>
                </div>

                <div className='locations'>
                  {
                    locs.map((loc) => (
                      <Location
                        key={loc.id} 
                        data={loc}
                        isSelected={selectedLocation?.id === loc.id}
                        onSelect={() => toggleLocation(loc)}
                      />
                    ))
                  }
                </div>
              </div>
              <button onClick={() => handleSelectLocationButton()}>Tiếp theo</button>
              {
                showLocationWarning && (
                  <div className='location-warning'>Vui lòng chọn địa điểm thi</div>
                )
              }
            </motion.div>      
          )
        }
        </AnimatePresence>
        
        <AnimatePresence mode='wait'>
        {
          step === 2 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 1000 }}
                animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, x: -2000 }}
                transition={{ duration: 0.4, delay: 0.4}}
              >
                <SelectedLocation setStep={setStep} location={selectedLocation}/>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: window.innerHeight }}
                animate={{ opacity: 1, y: 0, transition: {duration: 0.4, delay: 1}}}
                exit={{ opacity: 0, x: -window.innerWidth, transition: {duration: 0.4}}}
              >
                <div className='select-exam-session'>
                  <div className='session'>
                    <img src={logo_exam_session} alt="" />
                    <span>Lựa chọn ca thi</span>
                  </div>
                  <div className='exam-sessions'>
                    {
                      filteredSessionsBySelectedLocation.map((e) => (
                        <ExamSession
                          key={e.id}
                          data={e}
                          isSelected={selectedExamSession?.id === e.id}
                          onSelect={() => toggleExamSession(e)}
                        />
                      ))
                    }
                  </div>
                </div>
                <button onClick={() => handleSelectExamSessionButton()}>Tiếp theo</button>
                {
                  showExamSessionWarning && (
                    <div className='exam-session-warning'>Vui lòng chọn ca thi</div>
                  )
                }
              </motion.div>
            </>
          )
        }
        </AnimatePresence>

        <AnimatePresence mode='wait'>
        {
          step === 3 && (
            <>
              <SelectedLocation setStep={setStep} location={selectedLocation}/>
              <motion.div
                initial={{ opacity: 0, y: window.innerHeight }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, delay: 0.6}}
              >
                <SelectExamSession setStep={setStep} examSession={selectedExamSession}/>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: window.innerHeight }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, delay: 0.8}}
              >
                <Reminder/>
                <button onClick={() => setShowTicket(true)}>Xác nhận và đăng kí</button>
              </motion.div>
            </>
          )
        }
        </AnimatePresence>
      </div>
      {
        showTicket &&
        <Ticket/>
      }
    </motion.div>
  )
}

export default ExamRegister;