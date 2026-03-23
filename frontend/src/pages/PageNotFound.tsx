import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function PageNotFound() {
  return (
    <div>
        <Navbar />
        <div className="h-[75vh] grid min-h-35 w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            <h1 className="text-6xl">Error 404: Page not found</h1>
        </div>

        <Footer />
    </div>
  )
}

export default PageNotFound