import './Style-Location.css'

const Location = () => {
  return (
    <div className='location'>
      <h4>Giảng đường 1</h4>
      <div className='location-info'>
        <span>Trạng thái:</span>
        <span className='status'>Còn chỗ</span>
      </div>
      <div className='location-info'>
        <span>Địa chỉ:</span>
        <span>P. Kiều Mai, Phúc Diễn, Từ Liêm, Hà Nội</span>
      </div>
    </div>
  )
}

export default Location;