import Header from '../../components/header/Header';
import SelectedSubject from '../../components/selectedSubject/SelectedSubject';
import './Style-ExamRegister.css'
import logo_location from '../../assets/logo_location.png'
import Location from '../../components/location/Location';
import ExamSession from '../../components/examSession/ExamSession';
import logo_exam_session from '../../assets/logo_exam_session.png'
import { useContext, useState } from 'react';
import SelectedLocation from '../../components/selectedLocation/SelectedLocation';
import SelectExamSession from '../../components/selectedExamSession/SelectedExamSession';
import Reminder from '../../components/reminder/Reminder';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import { motion, AnimatePresence } from 'framer-motion'

//fake data
import locationData from '../../data/LocationData.json'
import examSessionData from '../../data/ExamSession.json'

const ExamRegister = () => {

  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const [showLocationWarning, setShowLocationWarning] = useState(false)
  const [showExamSessionWarning, setShowExamSessionWarning] = useState(false)
  const {
    selectedSubject,
    selectedLocation, 
    setSelectedLocation,
    selectedExamSession,
    setSelectedExamSession
  } = useContext(MyContext)

  //fake data
  const locs = locationData



  const toggleLocation = (loc) => {
    if (loc.status === "Còn chỗ") {
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


  //fake data
  const examSessions = examSessionData

  const toggleExamSession = (examSession) => {
    if (examSession.status === "Còn chỗ") {
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


  return (
    <motion.div
      initial={{ opacity: 0, x: window.innerWidth }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className='exam-register'>
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
                      examSessions.map((e) => (
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
                transition={{ duration: 0.4, delay: 0.4}}
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
                <button onClick={() => navigate('/ticket')}>Xác nhận và đăng kí</button>
              </motion.div>
            </>
          )
        }
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ExamRegister;