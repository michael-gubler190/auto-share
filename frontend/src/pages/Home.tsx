import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import { useCars } from "../hooks/useCars"

function HomePage() {
  const { data, isLoading, isError } = useCars();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load listings</div>;

  return (
    <div>
        {/* Navbar */}
        <Navbar />

        <div className="sm:container mx-auto mb-10">
            <div className="flex justify-center my-10">
                {/* Search */}
                <SearchBar />
            </div>

            {/* Random feed (currently use dummy data to show where footer will be when data is populated) */}
            {Array.from({ length: 20 }, (_, i) => (
                <h1 key={i}>Galler {i + 1}</h1>
            ))}
        </div>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default HomePage;