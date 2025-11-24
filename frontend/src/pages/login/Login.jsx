import './Style-Login.css'
import logo_university from '../../assets/logo_uet.webp'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth() 
  

  const handleFocusPassword = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.querySelector('input[type="password"]').focus()
    }
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (err) {
      console.error('Login failed', err.error, err.status)
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
        <form className='login-form' onSubmit={handleSubmitLogin}>
          <h1>Đăng nhập</h1>
          <div>
            <label>Email</label>
            <input 
              type="text" 
              placeholder='Nhập email' 
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleFocusPassword}
            />
          </div>
          <div className='password-login'>
            <label>Mật khẩu</label>
            <input 
              type="password" 
              placeholder='Nhập mật khẩu' 
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
