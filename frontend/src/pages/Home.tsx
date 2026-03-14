import CarListingCard from "../components/CarListingCard";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import { useCars } from "../hooks/useCars"
import LoadingScreen from "./LoadingScreen";

function HomePage() {
  const { data, isLoading, isError } = useCars();

  if (isLoading) return <LoadingScreen />;
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

            {/* Car Feed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {data?.map(car => (
                <CarListingCard
                  key={car["carId"]}
                  carId={car["carId"]}
                  userId={car["userId"]}
                  make={car["make"]}
                  model={car["model"]}
                  year={car["year"]}
                  numberOfSeats={car["numberOfSeats"]}
                  powerType={car["powerType"]}
                  milesPerGallon={car["milesPerGallon"]}
                  distanceWithFullCharge={car["distanceWithFullCharge"]}
                  transmission={car["transmission"]}
                  pricePerDay={car["pricePerDay"]}
                  createdAt={car["createdAt"]}
                />
              ))}
            </div>
        </div>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default HomePage;