import CarListingCard from "../components/CarListingCard";
import CreateListingForm from "../components/CreateListingForm";
import Footer from "../components/Footer"
import Modal from "../components/Modal";
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import { useAuth } from "../context/AuthContext";
import { useCars } from "../hooks/useCars"
import { useModal } from "../hooks/useModal";
import { UserTypes } from "../types/user";
import LoadingScreen from "./LoadingScreen";

function HomePage() {
  const { data, isLoading, isError } = useCars();
  const { user } = useAuth();
  const createListingModal = useModal();

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

            {user && user.role == UserTypes.owner && (
              <div className="mb-5">
                <button onClick={createListingModal.open} type="button" className='bg-sky-500 hover:bg-sky-400 transition text-white p-2 font-medium text-md mt-3 rounded-full cursor-pointer'>+ Create listing</button>

                <Modal
                  isOpen={createListingModal.isOpen}
                  onClose={createListingModal.close}
                  title="Create listing"
                >
                  <CreateListingForm />
                </Modal>
              </div>
            )}

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