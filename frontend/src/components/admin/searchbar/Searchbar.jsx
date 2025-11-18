import { IoIosSearch } from "react-icons/io";
import { TfiImport } from "react-icons/tfi";
import { IoMdAdd } from "react-icons/io";
import './Style-Searchbar.css';

const Searchbar = ({onSearch, onImport, onAdd}) => (
  <div className="searchbar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, mã sinh viên"
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
        <button className="search-btn">
          <IoIosSearch className="search-icon" />
        </button>
      </div>
      <div className="buttons">
        <button onClick={onImport} className="btn-import">
          <TfiImport className="btn-icon-student" />
          <span>Import Excel</span>
        </button>
        <button onClick={onAdd} className="btn-add-student">
          <IoMdAdd className="btn-icon-student" />
          <span>Thêm sinh viên</span>
        </button>      
      </div>
  </div>
);

export default Searchbar;