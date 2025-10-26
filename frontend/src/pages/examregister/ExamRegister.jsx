import Header from '../../components/header/Header';
import SelectedExam from '../../components/selectedSubject/SelectedSubject';
import './Style-ExamRegister.css'
import logo_location from '../../assets/logo_location.png'
import Location from '../../components/location/Location';
import ExamSession from '../../components/examSession/ExamSession';
import logo_exam_session from '../../assets/logo_exam_session.png'
import { useState } from 'react';
import SelectedLocation from '../../components/selectedLocation/SelectedLocation';
import SelectExamSession from '../../components/selectedExamSession/SelectedExamSession';
import Reminder from '../../components/reminder/Reminder';

const ExamRegister = () => {

  const [step, setStep] = useState(1)

  return (
    <div className='exam-register'>
      <Header/>
      <SelectedExam/>

      {
        step === 1 && (
          <>
            <div className='select-location'>
              <div className='pos'>
                <img src={logo_location} alt="" />
                <span>Lựa chọn địa điểm thi</span>
              </div>

              <div className='locations'>
                <Location/>
                <Location/>
                <Location/>
                <Location/>
              </div>
            </div>
            <button onClick={() => setStep(prev => prev + 1)}>Tiếp theo</button>
          </>
          
        )
      }
  
      {
        step === 2 && (
          <>
            <SelectedLocation/>
            <div className='select-exam-session'>
              <div className='session'>
                <img src={logo_exam_session} alt="" />
                <span>Lựa chọn ca thi</span>
              </div>
              <div className='exam-sessions'>
                <ExamSession/>
                <ExamSession/>
                <ExamSession/>
                <ExamSession/>
              </div>
            </div>
            <button onClick={() => setStep(prev => prev + 1)}>Tiếp theo</button>
          </>
        )
      }

      {
        step === 3 && (
          <>
            <SelectedLocation/>
            <SelectExamSession/>
            <Reminder/>
            <button onClick={() => setStep(prev => prev + 1)}>Xác nhận và đăng kí</button>
          </>
        )
      }
    </div>
  )
}

export default ExamRegister;