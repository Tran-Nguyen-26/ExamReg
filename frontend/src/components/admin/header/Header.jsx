import './Style-Header.css';
import logo_university from '../../../assets/logo_university.png'; 
import { LuLogOut } from "react-icons/lu";
import { useAuth } from '../../../hooks/useAuth';

const Header = () => {

  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo_university} alt="" className='logo-image'/>
        <span className='logo-text'>UET Exam</span>
      </div>
      <div className='logout'>
        <button className="logout-btn" onClick={handleLogout}>
          <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  )
};

export default Header;