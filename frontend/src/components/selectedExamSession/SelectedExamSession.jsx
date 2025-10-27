import './Style-SelectedExamSession.css'
import logo_exam_session from '../../assets/logo_exam_session.png'
import logo_change from '../../assets/logo_change.png'

const SelectExamSession = ({setStep}) => {
  return (
    <div className="selected-exam-session">
      <div>
        <img src={logo_exam_session} alt="" />
        <span>Ca thi</span>
      </div>
      <h4>Ngày 01/01/2025</h4>
      <p>Thời gian thi: 7:00</p>
      <p>Phòng thi: 102</p>
      <div className='change-session' onClick={() => setStep(2)}>
        <img src={logo_change} alt="" />
        <span>Thay đổi ca thi</span>
      </div>
    </div>
  )
}

export default SelectExamSession