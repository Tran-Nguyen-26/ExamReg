import { BrowserRouter, Router, Routes, Route, useLocation } from "react-router-dom"
import ScrollToTop from "./components/admin/scrollToTop/ScrollToTop";
import Home from "./pages/student/home/Home";
import ExamRegister from "./pages/student/examregister/ExamRegister";
import ExamSchedule from "./pages/student/examSchedule/ExamSchedule";
import StudentManagement from "./pages/admin/studentmanagement/StudentManagement";
import CourseManagement from "./pages/admin/coursemanagement/CourseManagement";
import ExamManagement from "./pages/admin/examManagement/ExamManagement";
import ExamInformation from "./pages/admin/examInformation/ExamInformation";
import SubjectSessions from "./pages/admin/subjectSessions/SubjectSessions";
import Report from "./pages/admin/report/Report";
import { Navigate } from "react-router-dom";
import { Provider } from "./context/MyContext";
import StudentAccount from "./pages/student/studentAccount/StudentAccount";
import Login from "./pages/login/Login";
import { AnimatePresence } from "framer-motion";


const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to ="/login"/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/student/home" element={<Home/>}></Route>
        <Route path="/student/register/:subjectId" element={<ExamRegister/>}></Route>
        <Route path="/student/exam-schedule" element={<ExamSchedule/>}></Route>
        <Route path="/student/student-account" element={<StudentAccount />} />
        <Route path="/admin/student-management" element={<StudentManagement/>}></Route>
        <Route path="/admin/course-management" element={<CourseManagement/>}></Route>
        <Route path="/admin/exam-management" element={<ExamManagement/>}></Route>
        <Route path="/admin/exam-management/exam-info" element={<ExamInformation/>}></Route>
        <Route path="/admin/exam-management/exam-info/sessions" element={<SubjectSessions/>}></Route>
        <Route path="/admin/report" element={<Report/>}></Route>
      </Routes>
    </AnimatePresence>
  )
}



const App = () => {
  return (
    <Provider> 
      <BrowserRouter>
        <ScrollToTop/>
        <AnimatedRoutes/>
      </BrowserRouter>
    </Provider>
  )
}

export default App