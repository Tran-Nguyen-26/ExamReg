import './Style-SelectedLocation.css'
import logo_location from '../../assets/logo_location.png'
import logo_change from '../../assets/logo_change.png'

const SelectedLocation = ({setStep, location}) => {
  return (
    <div className='selected-location'>
      <div>
        <img src={logo_location} alt="" />
        <span>Địa điểm thi</span>
      </div>
      <h4>{location.name}</h4>
      <p>{`Địa chỉ: ${location.address}`}</p>
      <div className='change-location' onClick={() => setStep(1)}>
        <img src={logo_change} alt="" />
        <span>Thay đổi địa điểm thi</span>
      </div>
    </div>
  )
}

export default SelectedLocation