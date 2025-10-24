import Header from '../../components/header/Header';
import SelectedExam from '../../components/selectedExam/SelectedExam';
import './Style-ExamRegister.css'
import logo_location from '../../assets/logo_location.png'
import Location from '../../components/location/Location';
import { Link } from 'react-router-dom';

const ExamRegister = () => {
  return (
    <div className='exam-register'>
      <Header/>
      <Link to="/home">Quay lại</Link>
      <SelectedExam/>
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
      <button>Tiếp theo</button>
    </div>
  )
}

export default ExamRegister;