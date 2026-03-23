import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import CarDetailPage from "./pages/CarDetailPage"
import PageNotFound from "./pages/PageNotFound"
import ProfilePage from "./pages/ProfilePage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/cars/:carId" element={<CarDetailPage />}/>
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="*" element={<PageNotFound />}/>
    </Routes>
  )
}

export default App
