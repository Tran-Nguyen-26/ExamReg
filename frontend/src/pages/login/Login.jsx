import './Style-Login.css'
import logo_university from '../../assets/logo_uet.webp'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Login = () => {

  //fake data
  const fakeAccount = {
    email: 'test@vnu.edu.vn',
    password: '111'
  }

  const navigate = useNavigate()
  const [showError, setShowError] = useState(false)

  const handleFocusPassword = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.querySelector('input[type="password"]').focus()
    }
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    if (email === fakeAccount.email && password === fakeAccount.password) {
      navigate('/home')
    } else {
      setShowError(true)
    }
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
            <input type="text" placeholder='Nhập email' name='email' onKeyDown={handleFocusPassword}/>
          </div>
          <div className='password-login'>
            <label>Mật khẩu</label>
            <input type="password" placeholder='Nhập mật khẩu' name='password'/>
            <p className={`invalid ${showError ? 'show': ''}`}>
              Email hoặc mật khẩu không đúng. Vui lòng thử lại.
            </p>
          </div>
          <p className='forgot-password'>
            <span>Quên mật khẩu</span>
          </p>
          <button type='submit'></button>
        </form>
      </div>
    </div>
  )
}

export default Login
