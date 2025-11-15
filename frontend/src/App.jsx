import { BrowserRouter, Router, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/admin/scrollToTop/ScrollToTop";
import Home from "./pages/student/home/Home";
import ExamRegister from "./pages/student/examregister/ExamRegister";
import ExamTicket from "./pages/student/examTicket/ExamTicket";
import ExamSchedule from "./pages/student/examSchedule/ExamSchedule";
import StudentManagement from "./pages/admin/studentmanagement/StudentManagement";
import CourseManagement from "./pages/admin/coursemanagement/CourseManagement";
import ExamManagement from "./pages/admin/exammanagement/ExamManagement";
import ExamInformation from "./pages/admin/examInformation/ExamInformation";
import SubjectSessions from "./pages/admin/subjectSessions/SubjectSessions";
import Report from "./pages/admin/report/Report";
import { Navigate } from "react-router-dom";
import { Provider } from "./context/MyContext";



const App = () => {
  return (
    <Provider>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Navigate to ="/admin/exam-management"/>}></Route>
          <Route path="/student/home" element={<Home/>}></Route>
          <Route path="/student/register" element={<ExamRegister/>}></Route>
          <Route path="/student/ticket" element={<ExamTicket/>}></Route>
          <Route path="/student/exam-schedule" element={<ExamSchedule/>}></Route>
          <Route path="/admin/student-management" element={<StudentManagement/>}></Route>
          <Route path="/admin/course-management" element={<CourseManagement/>}></Route>
          <Route path="/admin/exam-management" element={<ExamManagement/>}></Route>
          <Route path="/admin/exam-management/exam-info" element={<ExamInformation/>}></Route>
          <Route path="/admin/exam-management/exam-info/sessions" element={<SubjectSessions/>}></Route>
          <Route path="/admin/report" element={<Report/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App