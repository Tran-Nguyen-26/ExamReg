import { BrowserRouter, Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/Home";
import ExamRegister from "./pages/examregister/ExamRegister";
import ExamTicket from "./pages/examTicket/ExamTicket";
import ExamSchedule from "./pages/examSchedule/ExamSchedule";
import { Provider } from "./context/MyContext";
import StudentAccount from "./pages/studentAccount/StudentAccount";


const App = () => {
  return (
    <Provider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/register" element={<ExamRegister/>}></Route>
          <Route path="/ticket" element={<ExamTicket/>}></Route>
          <Route path="/exam-schedule" element={<ExamSchedule/>}></Route>
          <Route path="/student-account" element={<StudentAccount/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App