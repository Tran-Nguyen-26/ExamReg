import { BrowserRouter, Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import ExamRegister from "./pages/examregister/ExamRegister";
import ExamTicket from "./pages/examTicket/ExamTicket";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/register" element={<ExamRegister/>}></Route>
        <Route path="/ticket" element={<ExamTicket/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;