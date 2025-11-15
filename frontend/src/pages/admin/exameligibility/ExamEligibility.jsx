import { useState } from "react";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import './Style-ExamEligibility.css'

const sampleSubjects = [
  { id: 'IT4001', name: 'IT4001 - Cơ sở dữ liệu' },
  { id: 'IT4002', name: 'IT4002 - Lập trình nâng cao' },
]

const sampleEligible = [
  { id: 1, code: '20210001', name: 'Nguyễn Văn An', class: 'IT-K65', status: 'Đủ điều kiện', reason: '' },
  { id: 2, code: '20210002', name: 'Trần Thị Bình', class: 'IT-K65', status: 'Đủ điều kiện', reason: '' },
  { id: 3, code: '20210003', name: 'Lê Văn Cường', class: 'IT-K65', status: 'Đủ điều kiện', reason: '' },
]

const sampleNotEligible = [
  { id: 1, code: '20210001', name: 'Nguyễn Văn B', class: 'IT-K65', status: 'Không đủ điều kiện', reason: '' },
  { id: 2, code: '20210002', name: 'Trần Thị A', class: 'IT-K65', status: 'Không đủ điều kiện', reason: '' },
  { id: 3, code: '20210003', name: 'Lê Văn C', class: 'IT-K65', status: 'Không đủ điều kiện', reason: '' },
];

const ExamEligibility = () => {
  const [subject, setSubject] = useState(sampleSubjects[0].id);
  const [activeTab, setActiveTab] = useState('eligible');
  const [eligibleList] = useState(sampleEligible);
  const [notEligibleList] = useState(sampleNotEligible);

  return (
    <div className="page">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">Quản lý điều kiện dự thi</h1>

          <div className="card">
            <div className="form-row">
              <label className="label">Chọn môn học</label>
              <select className="subject-select" value={subject} onChange={e => setSubject(e.target.value)}>
                {sampleSubjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="actions-row">
              <button className="btn btn-success btn-lg d-flex align-items-center gap-2 custom-action">
                <i className="fas fa-upload"></i>
                <span>Import SV đủ điều kiện (Excel)</span>
              </button>

              <button className="btn btn-danger btn-lg d-flex align-items-center gap-2 custom-action">
                <i className="fas fa-upload"></i>
                <span>Import SV không đủ điều kiện (Excel)</span>
              </button>

              <button className="btn btn-primary btn-lg d-flex align-items-center gap-2 custom-action">
                <i className="fas fa-download"></i>
                <span>Xuất danh sách (Excel)</span>
              </button>
            </div>

            <div className="tabs">
              <button className={`tab ${activeTab === 'eligible' ? 'active' : ''}`} onClick={() => setActiveTab('eligible')}>Đủ điều kiện ({eligibleList.length})</button>
              <button className={`tab ${activeTab === 'not' ? 'active' : ''}`} onClick={() => setActiveTab('not')}>Không đủ điều kiện ({notEligibleList.length})</button>
            </div>

            <div className="table-wrap">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>MÃ SV</th>
                    <th>HỌ VÀ TÊN</th>
                    <th>LỚP</th>
                    <th>TRẠNG THÁI</th>
                    <th>LÝ DO</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'eligible' ? eligibleList : notEligibleList).map((s, idx) => (
                    <tr key={s.id}>
                      <td>{idx + 1}</td>
                      <td>{s.code}</td>
                      <td>{s.name}</td>
                      <td>{s.class}</td>
                      <td><span className={`status ${activeTab === 'eligible' ? 'status-yes' : 'status-no'}`}>{activeTab === 'eligible' ? 'Đủ điều kiện' : 'Không đủ điều kiện'}</span></td>
                      <td>{s.reason || '-'}</td>
                    </tr>
                  ))}
                  { (activeTab === 'eligible' ? eligibleList : notEligibleList).length === 0 && (
                    <tr>
                      <td colSpan={6} style={{textAlign:'center', padding:'2rem'}}>Không có dữ liệu</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="guide">
              <h3>Hướng dẫn import dữ liệu từ Excel</h3>
              <ul>
                <li>File Excel phải có các cột: Mã sinh viên, Họ tên, Lớp</li>
                <li>Với danh sách "Đủ điều kiện" — hệ thống sẽ gán trạng thái phù hợp.</li>
                <li>Với danh sách "Không đủ điều kiện" — cung cấp cột "Lý do" nếu cần.</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamEligibility;
