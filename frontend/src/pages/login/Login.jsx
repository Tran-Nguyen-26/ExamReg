import './Style-Login.css'
import logo_university from '../../assets/logo_uet.webp'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const navigate = useNavigate()

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    navigate('/home')
  }


  return (
    <div className="login">
      <div className='left-panel'>
        <img src={logo_university} alt="" />
        <span>Hệ thống đăng kí dự thi</span>
        <span>Trường đại học công nghệ</span>
      </div>
      <div className='right-panel'>
        <form onSubmit={handleSubmitLogin}>
          <h1>Đăng nhập</h1>
          <div>
            <label>Email</label>
            <input type="text" placeholder='Nhập email'/>
          </div>
          <div>
            <label>Mật khẩu</label>
            <input type="password" placeholder='Nhập mật khẩu'/>
          </div>
          <p>Quên mật khẩu</p>
          <button type='submit'></button>
        </form>
      </div>
    </div>
  )
}

export default Login
