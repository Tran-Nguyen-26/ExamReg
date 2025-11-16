import { useContext } from "react"
import { authService } from "../services/authService"
import MyContext from "../context/MyContext"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {

  const { user, setUser } = useContext(MyContext)
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      const authResponse = await authService.login(email, password)
      setUser(authResponse.user)
      if (user.role === 'STUDENT') {
        if (user.firstLogin) navigate('/student-account')
        else navigate('/exam-schedule')
      }
      return authResponse
    } catch (e) {
      throw e
    }
  }

  const changePasswordFirstTime = async (password) => {
    try {
      const response = await authService.changePasswordFirstTime(password)
      return response
    } catch (e) {
      throw e
    }
  }
  return {login, changePasswordFirstTime}
}