import { BrowserRouter, Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;