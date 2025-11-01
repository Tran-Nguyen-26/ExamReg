import './Style-Sidebar.css';
import { TbReportAnalytics } from "react-icons/tb";
import { LuGraduationCap } from "react-icons/lu";
import { FaSwatchbook } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";
const Sidebar = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { id: 'exam', icon: <TbReportAnalytics size={24}/>, label: 'Quản lý kỳ thi' },
    { id: 'student', icon: <LuGraduationCap size={24}/>, label: 'Quản lý học sinh', active: true },
    { id: 'course', icon: <FaSwatchbook size={21}/>, label: 'Quản lý học phần' },
    { id: 'report', icon: <MdAssessment size={24}/>, label: 'Báo cáo' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onMenuChange(item.id)}
            className={`sidebar-menu-item ${item.active ? 'active' : ''}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;