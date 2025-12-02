import { useState } from 'react'
import './Style-ResetPassword.css'
import { useAuth } from '../../../hooks/useAuth'

const ResetPassword = ({token, isResetPassword, onCloseResetPassword}) => {

  const {resetPassword} = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!password.trim()) {
      newErrors.password = 'Vui lòng điền mật khẩu'
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
    } else if (password.trim() !== confirmPassword.trim()) {
      newErrors.confirmPassword = 'Mật khẩu không khớp'
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      return
    }
    try {
      await resetPassword(token, password)
      window.alert("Đặt lại mật khẩu mới thành công")
      window.location.href = '/login'
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className='reset-password-form' onSubmit={handleSubmitResetPassword}>
      <h2>Đặt lại mật khẩu</h2>
      <div>
        <p>Mật khẩu mới</p>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {
          errors.password &&
          <p className='error'>{errors.password}</p>
        }
      </div>
      <div>
        <p>Xác nhận lại mật khẩu</p>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {
          errors.confirmPassword &&
          <p className='error'>{errors.confirmPassword}</p>
        }
      </div>
      <button type='submit'>Xác nhận</button>
    </form>
  )
}

export default ResetPassword