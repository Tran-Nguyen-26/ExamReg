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

  const { getExamSessionsBySubjectId, registerExamSession } = useExamSession()
  const {subjectId} = useParams()
  const [examSessions, setExamSessions] = useState([])

  const [step, setStep] = useState(1)
  const [showLocationWarning, setShowLocationWarning] = useState(false)
  const [showExamSessionWarning, setShowExamSessionWarning] = useState(false)
  const [showTicket, setShowTicket] = useState(false)


  const {
    openExam,
    selectedSubject,
    selectedLocation, 
    setSelectedLocation,
    selectedExamSession,
    setSelectedExamSession
  } = useContext(MyContext)

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examSessionsBySubjectId = await getExamSessionsBySubjectId(subjectId, openExam.id)
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

  const handleExamSessionRegister = async () => {
    try {
      await registerExamSession(selectedExamSession.id)
      window.alert("Đăng kí ca thi thành công")
      setShowTicket(true)
    } catch(error) {
      console.error("Failed to register: ", error)
      window.alert(`Đăng kí ca thi thất bại \n ${error.response.data.message}`)
    }
  }


  return (
    <motion.div
      key={step}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{ duration: 0.3 }}
    >
      <div className={`exam-register ${showTicket ? 'blurred' : ''}`}>
        <Header/>
        <SelectedSubject subject={selectedSubject}/>

        <AnimatePresence mode='wait'>
        {
          step === 1 && (
            <motion.div
              key='step-1'
              initial= {{ opacity: 0, x: 60 }}
              animate= {{ opacity: 1, x: 0 }}
              exit= {{ opacity: 0, x: -40 }}
              transition= {{ duration: 0.35, ease: "easeOut" }}
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
                key='step-2'
                initial= {{ opacity: 0, x: 40 }}
                animate= {{ opacity: 1, x: 0 }}
                exit= {{ opacity: 0, x: -20 }}
                transition= {{ duration: 0.35, ease: "easeOut" }}
              >
                <SelectedLocation setStep={setStep} location={selectedLocation}/>
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
              <motion.div
                key='step-3'
                initial= {{ opacity: 0, x: 40 }}
                animate= {{ opacity: 1, x: 0 }}
                exit= {{ opacity: 0, x: -20 }}
                transition= {{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
              >
              <SelectedLocation setStep={setStep} location={selectedLocation}/>
                <SelectExamSession setStep={setStep} examSession={selectedExamSession}/>
                <Reminder/>
                <button onClick={handleExamSessionRegister}>Xác nhận và đăng kí</button>
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