import './Style-Subject.css'
import logo_subject from '../../assets/logo_subject.png'
import regis_btn from '../../assets/register-btn.png'

const Subject = () => {
  return (
    <div className='subject'>
      <div className='title'>
        <div>
          <img src={logo_subject} alt="" />
          <span className='subject-name'>Cơ sở dữ liệu</span>
        </div>
        <div className='register'>
          <span>Đăng ký</span>
          <img src={regis_btn} alt="" />
        </div>
      </div>
      <div className='subject-info'>
        <div className='sub-info'>
          <span>Mã HP:</span>
          <span>CS12321</span>
        </div>
        <div className='sub-info'>
          <span>Số tín chỉ:</span>
          <span>3</span>
        </div>
      </div>
    </div>
  )
}

export default Subject;