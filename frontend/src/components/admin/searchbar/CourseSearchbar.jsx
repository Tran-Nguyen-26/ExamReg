import { IoIosSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import './Style-CourseSearchbar.css';

const CourseSearchbar = ({ onSearch, onAdd }) => (
  <div className="course-searchbar-container">
    <div className="search-controls">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên, mã học phần"
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="search-input"
      />

      <select className="search-select" defaultValue="all">
        <option value="all">Tất cả khoa</option>
        <option value="it">Công nghệ thông tin</option>
        <option value="ece">Khoa Điện tử</option>
      </select>

      <select className="search-select" defaultValue="all-type">
        <option value="all-type">Tất cả các loại</option>
        <option value="theory">Lý thuyết</option>
        <option value="practice">Thực hành</option>
      </select>

      <button className="search-btn" title="Tìm kiếm">
        <IoIosSearch className="search-icon" />
      </button>
    </div>

    <button onClick={onAdd} className="btn-add">
      <IoMdAdd className="btn-icon" />
      <span>Thêm môn học</span>
    </button>
  </div>
);

export default CourseSearchbar;
