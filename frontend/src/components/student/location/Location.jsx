import './Style-Location.css'
import logo_tick from '../../../assets/logo_tick.png'

const Location = ({data, isSelected, onSelect}) => {
  return (
    <div
      className={`location ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <h4>{data.name}</h4>
      <div className='location-info'>
        <span>Trạng thái:</span>
        <span className='status'>Còn chỗ</span>
      </div>
      <div className='location-info'>
        <span>Địa chỉ:</span>
        <span>{data.address}</span>
      </div>
      <img src={logo_tick} alt="" className={`${isSelected ? "ticked" : ''}`}/>
    </div>
  )
}

export default Location;