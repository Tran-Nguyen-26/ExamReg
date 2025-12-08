import { useState } from 'react'
import './Style-ForgotPassword.css'
import { useAuth } from '../../../hooks/useAuth'

const ForgotPassword = ({isForgotPassword, onCloseForgotPassword}) => {

  const [email, setEmail] = useState('')
  const {forgotPassword} = useAuth()

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault()
    try {
      await forgotPassword(email)
      window.alert("Send email")
    } catch (error) {
      console.error("Sent email failed")
    }
  }

  return (
    <form className='forgot-password-form' onSubmit={handleSubmitForgotPassword}>
      <h2>Quên mật khẩu</h2>
      <p>Vui lòng nhập email để lấy đường dẫn tạo mật khẩu mới</p>
      <div>
        <p>Email</p>
        <input 
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type='submit'>Tiếp tục</button>
      <p className='return' onClick={() => onCloseForgotPassword(false)}>Quay lại</p>
    </form>
  )
}

export default ForgotPassword