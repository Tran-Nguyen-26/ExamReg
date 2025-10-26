import './Style-ExamSession.css'

const ExamSession = () => {
  return (
    <div className='exam-session'>
      <h4>Ngày 01/01/2025</h4>
      <div className='session-info'>
        <span>Giờ thi:</span>
        <span>Ca1 - 7:00</span>
      </div>
      <div className='session-info'>
        <span>Phòng thi:</span>
        <span>102</span>
      </div>
      <div className='session-info'>
        <span>Trạng thái:</span>
        <span className='status'>Còn chỗ</span>
      </div>
    </div>
  )
}

export default ExamSession;