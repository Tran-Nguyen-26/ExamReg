import './Style-SelectedLocation.css'
import logo_location from '../../assets/logo_location.png'
import logo_change from '../../assets/logo_change.png'

const SelectedLocation = ({setStep}) => {
  return (
    <div className='selected-location'>
      <div>
        <img src={logo_location} alt="" />
        <span>Địa điểm thi</span>
      </div>
      <h4>Giảng đường 1</h4>
      <p>Địa chỉ: P:Kiều Mai, Phúc Diễn, Từ Liêm, Hà Nội</p>
      <div className='change-location' onClick={() => setStep(1)}>
        <img src={logo_change} alt="" />
        <span>Thay đổi địa điểm thi</span>
      </div>
    </div>
  )
}

export default SelectedLocation