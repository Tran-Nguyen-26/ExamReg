import './Style-SelectedExamSession.css'
import { MdOutlineChangeCircle } from "react-icons/md"
import logo_exam_session from '../../../assets/logo_exam_session.png'

const SelectExamSession = ({setStep, examSession}) => {
  return (
    <div className="selected-exam-session">
      <div>
        <img src={logo_exam_session} alt="" />
        <span>Ca thi</span>
      </div>
      <h4>{`Ngày ${examSession.date}`}</h4>
      <p>{`Thời gian thi: ${examSession.time}`}</p>
      <p>{`Phòng thi: ${examSession.room}`}</p>
      <div className='change-session' onClick={() => setStep(2)}>
        <MdOutlineChangeCircle/>
        <span>Thay đổi ca thi</span>
      </div>
    </div>
  )
}

export default SelectExamSession