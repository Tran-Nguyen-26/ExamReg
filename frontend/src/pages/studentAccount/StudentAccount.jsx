import { useState } from 'react';
import Header from '../../components/header/Header'
import './Style-StudentAccount.css'
import { IoIosLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { MdChangeCircle } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const StudentAccount = () => {

  //fake data
  const fakeAccount = {
    email: 'test@vnu.edu.vn',
    password: '111'
  }

  const navigate = useNavigate()

  const [tabContent, setTabContent] = useState('password')

  const handleSelectTab = (tabName) => {
    setTabContent(tabName)
  }

  const handleFocusChangePassword = (e, classname) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      document.querySelector(classname).focus()
    }
  }

  const handleCancel = () => {
    document.querySelector('.present-password').value = ''
    document.querySelector('.new-password').value = ''
    document.querySelector('.confirm-new-password').value = ''
  }

  const handleSubmitChangePassword = () => {
    
  }

  return (
    <div>
      <Header/>
      <div className='student-account'>
        <div className='account-tabs'>
          <div className='tab-top'>
            <div className={`tab-info ${tabContent==="info" ? 'active' : ''}`} onClick={() => handleSelectTab('info')}>
              <MdAccountCircle/>
              <span>Thông tin cá nhân</span>
            </div>
            <div className={`tab-change-password ${tabContent==='password' ? 'active': ''}`} onClick={() => handleSelectTab('password')}>
              <MdChangeCircle/>
              <span>Đổi mật khẩu</span>
            </div>
          </div>
          <div className='tab-logout' onClick={() => navigate('/login')}>
            <IoIosLogOut/>
            <span>Đăng xuất</span>
          </div>
        </div>
        {
          tabContent === 'info' &&
          <div className='tab-info-content info'>
            <div>
              <label>Họ và tên:</label>
              <span>Nguyễn Văn A</span>
            </div>
            <div>
              <label>Mã sinh viên:</label>
              <span>23021651</span>
            </div>
            <div>
              <label>Ngày sinh:</label>
              <span>05/05/2005</span>
            </div>
            <div>
              <label>Giới tính:</label>
              <span>Nam</span>
            </div>
            <div>
              <label>Email:</label>
              <span>nguyenvana@gmail.com</span>
            </div>
            <div>
              <label>Số điện thoại:</label>
              <span>12432154135</span>
            </div>
            <div>
              <label>Lớp:</label>
              <span>CSI-2</span>
            </div>
            <div>
              <label>Ngành học:</label>
              <span>Khoa học máy tính</span>
            </div>
            <div>
              <label>Khoa:</label>
              <span>Công nghệ thông tin</span>
            </div>
          </div>
        }
        {
          tabContent === 'password' &&
          <div className='tab-change-password-content password'>
            <form>
              <div>
                <label>Mật khẩu hiện tại</label>
                <input 
                  className='present-password' 
                  type="password" 
                  placeholder='Nhập mật khẩu hiện tại'
                  onKeyDown={(e) => handleFocusChangePassword(e, '.new-password')}
                />
              </div>
              <div>
                <label>Mật khẩu mới</label>
                <input 
                  className='new-password' 
                  type="password" 
                  placeholder='Nhập mật khẩu mới'
                  onKeyDown={(e) => handleFocusChangePassword(e, '.confirm-new-password')}
                />
              </div>
              <div>
                <label>Xác nhận mật khẩu mới</label>
                <input 
                  className='confirm-new-password' 
                  type="password" 
                  placeholder='Xác nhận mật khẩu mới'
                  onKeyDown={(e) => handleFocusChangePassword(e, '.btn-change')}
                />
              </div>
              <div className='form-actions'>
                <button className='btn-change'>Đổi mật khẩu</button>
                <button type='button' className='btn-cancel' onClick={handleCancel}>Hủy</button>
              </div>
              <ul>
                <li>
                  <FaCheck/>
                  <span>Sử dụng ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt</span>
                </li>
                <li>
                  <FaCheck/>
                  <span>Không sử dụng thông tin cá nhât dễ đoán (tên, ngày sinh, số điện thoại)</span>
                </li>
                <li>
                  <FaCheck/>
                  <span>Không sử dụng mật khẩu giống với tài khoản khác</span>
                </li>
                <li>
                  <FaCheck/>
                  <span>Thay đổi mật khẩu định kỳ 3-6 tháng/lần</span>
                </li>
              </ul>
            </form>
          </div>
        }
      </div>
    </div>
  )
}

export default StudentAccount