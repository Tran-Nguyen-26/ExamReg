import { useState } from 'react'
import './Style-ForgotPassword.css'
import { useAuth } from '../../../hooks/useAuth'
import Spinner from '../../student/spinner/Spinner'

const ForgotPassword = ({isForgotPassword, onCloseForgotPassword}) => {

  const [email, setEmail] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState('')
  const [success, setSuccess] = useState(false)
  const {forgotPassword} = useAuth()

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setNotice("Vui lòng nhập email")
      return
    }
    try {
      setLoading(true)
      await forgotPassword(email)
      setLoading(false)
      setNotice("Gửi email thành công")
      setSuccess(true)
    } catch (error) {
      setLoading(false)
      setNotice(error.message)
      setSuccess(false)
      console.error(error)
    }
  }

  return (
    <form className='forgot-password-form' onSubmit={handleSubmitForgotPassword}>
      <h2>Quên mật khẩu</h2>
      <p>Vui lòng nhập email để lấy đường dẫn tạo mật khẩu mới</p>
      <div className='email-input'>
        <p>Email</p>
        <input 
          type="text"
          placeholder='example@vnu.edu.vn'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {
          notice &&
          <p className={`email-notice ${success ? 'success' : ''}`}>{notice}</p>
        }
      </div>
      <button type='submit'>
        {loading ? <Spinner/> : "Xác nhận"}
      </button>
      <p className='return' onClick={() => onCloseForgotPassword(false)}>Quay lại</p>
    </form>
  )
}

export default ForgotPassword