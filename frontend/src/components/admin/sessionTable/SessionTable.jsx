import "./Style-SessionTable.css"
import { PiDotsThreeCircle } from "react-icons/pi";
import { useState, useEffect } from "react";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
const SessionTable = ({sessions}) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    const toggleDropdown = (sessionId, event) => {
        if (openDropdown === sessionId) {
            setOpenDropdown(null);
        } else {
            const rect = event.currentTarget.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 5,
                left: rect.right - 180 // 180 là width của dropdown
            });
            setOpenDropdown(sessionId);
        }
    };

    // Xử lý click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Kiểm tra nếu click không phải vào dropdown hoặc icon
            if (openDropdown && 
                !event.target.closest('.session-dropdown-menu') && 
                !event.target.closest('.session-table-action')) {
                setOpenDropdown(null);
            }
        };

        // Thêm event listener
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    return (
        <>
        <div className="session-table-container">
            <div className="session-table-wrapper">
                <table className="session-table">
                    <thead>
                        <tr className="session-table-row">
                            <th className="session-table-header">STT</th>
                            <th className='session-table-header'>Tên môn thi</th>
                            <th className='session-table-header'>Ngày thi</th>
                            <th className='session-table-header'>Giờ bắt đầu</th>
                            <th className='session-table-header'>Phòng thi</th>
                            <th className='session-table-header'>Địa điểm thi</th>
                            <th className='session-table-header'>Sức chứa</th>
                            <th className='session-table-header'>Trạng thái</th>
                            <th className='session-table-header'>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={session.id} className="session-row">
                                <td className="session-table-cell">{index + 1}</td>
                                <td className="session-table-cell">{session.subject}</td>
                                <td className="session-table-cell">{session.date}</td>
                                <td className="session-table-cell">{session.time}</td>
                                <td className="session-table-cell">{session.room}</td>
                                <td className="session-table-cell">{session.location}</td>
                                <td className="session-table-cell">{session.capacity}</td>
                                <td className="session-table-cell">
                                    <span className={`session-status-badge ${session.registered >= session.capacity ? "session-status-full" : "session-status-available"}`}> 
                                        {session.registered >= session.capacity ? "Đã đầy" : "Còn chỗ"}
                                    </span>
                                </td>
                                <td className="session-table-cell">
                                    <div className="session-action-wrapper">
                                        <PiDotsThreeCircle 
                                            className={`session-table-action ${openDropdown === session.id ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDropdown(session.id, e);
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Dropdown nằm ngoài table */}
            {openDropdown && (
                <div 
                    className="session-dropdown-menu"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`
                    }}
                >
                    <button 
                        className="session-dropdown-item"
                        onClick={() => {
                            console.log('Xem chi tiết:', openDropdown);
                            setOpenDropdown(null);
                        }}
                    >
                        <MdOutlinePeopleAlt className="session-students-icon"/>
                        <span>Xem danh sách sinh viên</span>
                    </button>
                    <button 
                        className="session-dropdown-item"
                        onClick={() => {
                            console.log('Chỉnh sửa:', openDropdown);
                            setOpenDropdown(null);
                        }}
                    >
                        <FaEdit className="session-edit-icon"/>
                        <span>Chỉnh sửa ca thi</span>
                    </button>
                    <button 
                        className="session-dropdown-item session-dropdown-item-danger"
                        onClick={() => {
                            console.log('Xóa:', openDropdown);
                            setOpenDropdown(null);
                        }}
                    >
                        <FaTrashCan className="session-delete-icon "/>
                        <span>Xóa</span>
                    </button>
                </div>
            )}
        </div>
        </>
    )
}
export default SessionTable;