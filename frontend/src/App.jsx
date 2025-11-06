import { BrowserRouter, Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Home from "./pages/home/Home";
import ExamRegister from "./pages/examregister/ExamRegister";
import ExamSchedule from "./pages/examSchedule/ExamSchedule";
import { Provider } from "./context/MyContext";
import StudentAccount from "./pages/studentAccount/StudentAccount";
import Login from "./pages/login/Login";

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<ExamRegister />} />
        <Route path="/exam-schedule" element={<ExamSchedule />} />
        <Route path="/student-account" element={<StudentAccount />} />
      </Routes>
    </AnimatePresence>
  )
}


const App = () => {
  return (
    <Provider> 
      <BrowserRouter>
        <AnimatedRoutes/>
      </BrowserRouter>
    </Provider>
  )
}

export default App