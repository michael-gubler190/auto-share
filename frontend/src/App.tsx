import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import CarDetailPage from "./pages/CarDetailPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/cars/:carId" element={<CarDetailPage />}/>
    </Routes>
  )
}

export default App
