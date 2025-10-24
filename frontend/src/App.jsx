import { BrowserRouter, Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import ExamRegister from "./pages/examregister/ExamRegister";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/register" element={<ExamRegister/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;