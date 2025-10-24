import './Style-SelectedExam.css'
import logo_subject from '../../assets/logo_subject.png'

const SelectedExam = () => {
  return (
    <div className='selected-exam'>
      <div>
        <img src={logo_subject} alt="" />
        <span>Môn thi</span>
      </div>
      <h4>Cơ sở dữ liệu</h4>
      <p>Kiểm tra cuối kì học kì I năm học 2025-2026</p>
      <p>Thời lượng bài thi: 60 phút</p>
    </div>
  )
}

export default SelectedExam;