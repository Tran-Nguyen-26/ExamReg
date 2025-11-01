import Header from '../../../components/student/header/Header';
import SelectedSubject from '../../../components/student/selectedSubject/SelectedSubject';
import './Style-ExamRegister.css'
import logo_location from '../../../assets/logo_location.png'
import Location from '../../../components/student/location/Location';
import ExamSession from '../../../components/student/examSession/ExamSession';
import logo_exam_session from '../../../assets/logo_exam_session.png'
import { useContext, useState } from 'react';
import SelectedLocation from '../../../components/student/selectedLocation/SelectedLocation';
import SelectExamSession from '../../../components/student/selectedExamSession/SelectedExamSession';
import Reminder from '../../../components/student/reminder/Reminder';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../../context/MyContext';

//fake data
import locationData from '../../../data/LocationData.json'
import examSessionData from '../../../data/ExamSession.json'

const ExamRegister = () => {

  const [step, setStep] = useState(1)
  const navigate = useNavigate()
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
    selectedLocation?.id == loc.id ? setSelectedLocation(null) : setSelectedLocation(loc)
  }

  const handleSelectLocationButton = () => {
    if (selectedLocation !== null) {
      setStep(step + 1)
    }
  }


  //fake data
  const examSessions = examSessionData

  const toggleExamSession = (examSession) => {
    selectedExamSession?.id == examSession.id ? setSelectedExamSession(null) : setSelectedExamSession(examSession)
  }

  const handleSelectExamSessionButton = () => {
    if (selectedExamSession !== null) {
      setStep(step + 1)
    }
  }


  return (
    <div className='exam-register'>
      <Header/>
      <SelectedSubject subject={selectedSubject}/>

      {
        step === 1 && (
          <>
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
          </>      
        )
      }
  
      {
        step === 2 && (
          <>
            <SelectedLocation setStep={setStep} location={selectedLocation}/>
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
          </>
        )
      }

      {
        step === 3 && (
          <>
            <SelectedLocation setStep={setStep} location={selectedLocation}/>
            <SelectExamSession setStep={setStep} examSession={selectedExamSession}/>
            <Reminder/>
            <button onClick={() => navigate('/student/ticket')}>Xác nhận và đăng kí</button>
          </>
        )
      }
    </div>
  )
}

export default ExamRegister;