import './Style-ExamSession.css'
import logo_tick from '../../../assets/logo_tick.png'

const ExamSession = ({data, isSelected, onSelect}) => {
  return (
    <div 
      className={`exam-session ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <h4>{`Ngày thi ${data.date}`}</h4>
      <div className='session-info'>
        <span>Giờ thi:</span>
        <span>{data.time}</span>
      </div>
      <div className='session-info'>
        <span>Phòng thi:</span>
        <span>{data.room}</span>
      </div>
      <div className='session-info'>
        <span>Trạng thái:</span>
        <span className={`status ${data.status === "Còn chỗ" ? 'available' : "full"}`}>
          {data.status}
        </span>
      </div>
      <img src={logo_tick} alt="" className={`${isSelected ? "ticked" : ''}`}/>
    </div>
  )
}

export default ExamSession;