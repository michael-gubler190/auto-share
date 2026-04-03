import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useCarById } from "../hooks/useCars";
import { UserIcon, ExclamationCircleIcon, BoltIcon, GlobeAmericasIcon, Battery100Icon, CogIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/16/solid";
import LoadingScreen from "./LoadingScreen";
import { useState, type SubmitEvent } from "react";
import { useRequestBooking } from "../hooks/useBookings";
import type { BookingRequest } from "../types/booking";


const reviewCategories = [
    {
        "category": "Cleanliness",
        "score": 5.0
    },

    {
        "category": "Maintenance",
        "score": 5.0
    },

    {
        "category": "Communication",
        "score": 5.0
    },

    {
        "category": "Convenience",
        "score": 5.0
    },

    {
        "category": "Accuracy",
        "score": 5.0
    },
]


function CarDetailPage() {
    const { carId } = useParams<{ carId: string }>();
    const { data, isLoading, isError } = useCarById(carId!);
    const requestBookingMutation = useRequestBooking();

    const [tripStartDate, setTripStartDate] = useState("");
    const [tripStartTime, setTripStartTime] = useState("");
    const [tripEndDate, setTripEndDate] = useState("");
    const [tripEndTime, setTripEndTime] = useState("");

    const [pickupLocation, setPickupLocation] = useState("");
    const [dropOffLocation, setDropOffLocation] = useState("");

    if (isLoading) return <LoadingScreen />;
    if (isError) return <div>Error occured</div>;


    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        
        // Format trip start and end to fit request
        const tripStart = `${tripStartDate}T${tripStartTime}:00-00:00`;
        const tripEnd = `${tripEndDate}T${tripEndTime}:00-00:00`;

        // Create BookingRequest instance
        const bookingRequest: BookingRequest = {
            tripStart,
            tripEnd,
            pickupLocation,
            dropOffLocation
        }

        // Request booking
        requestBookingMutation.mutate(
            {
                dto: bookingRequest,
                carId: carId!
            },
            {
                onSuccess: (response) => {
                    console.log(response);
                }
            }
        )
    }

  return (
    <div>
        {/* Navbar */}
        <Navbar />

        <div className="max-w-7xl mx-auto my-15 px-5 sm:px-10 md:px-20">
            {/* Image gallery */}
            <div className="h-120 flex gap-2">
                <img
                    className='rounded-2xl w-full h-full object-cover cursor-pointer'
                    src="https://images.turo.com/media/vehicle/images/C7biWnpiTUirsC3hidS-ew.jpg"
                    alt={data!["carId"]}
                />

                <div className="h-full gap-2 flex flex-col">
                    <img
                        className='rounded-2xl w-full h-full object-cover cursor-pointer'
                        src="https://images.turo.com/media/vehicle/images/C7biWnpiTUirsC3hidS-ew.jpg"
                        alt={data!["carId"]}
                    />
                    <img
                        className='rounded-2xl w-full h-full object-cover cursor-pointer'
                        src="https://images.turo.com/media/vehicle/images/C7biWnpiTUirsC3hidS-ew.jpg"
                        alt={data!["carId"]}
                    />
                </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-10">
                {/* Listing information */}
                <div className="col-span-2 space-y-2">
                    <h1 className="font-bold text-4xl">{data!["make"]} {data!["model"]}</h1>
                    <p className="text-2xl">{data!["year"]}</p>

                    <div className="gap-3 flex my-5">
                        <span className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 px-3 py-2 text-lg font-medium text-sky-500 inset-ring inset-ring-sky-500/20">
                            <UserIcon className="size-6"/>
                            <span>{data!["numberOfSeats"]} seats</span>
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 px-3 py-2 text-lg font-medium text-sky-500 inset-ring inset-ring-sky-500/20">
                            {data!["powerType"] == "gas" ? <ExclamationCircleIcon className="size-6"/> : <BoltIcon className="size-6"/>}
                            <span>{data!["powerType"]?.toUpperCase()}</span>
                        </span>

                        {data!["powerType"] == "gas" ? (
                            <span className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 px-3 py-2 text-lg font-medium text-sky-500 inset-ring inset-ring-sky-500/20">
                                <GlobeAmericasIcon className="size-6"/>
                                <span>{data!["milesPerGallon"]} MPG</span>
                            </span>

                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 px-3 py-2 text-lg font-medium text-sky-500 inset-ring inset-ring-sky-500/20">
                                <Battery100Icon className="size-6"/>
                                <span>{data!["distanceWithFullCharge"]} miles w/full charge</span>
                            </span>
                        )}

                        <span className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 px-3 py-2 text-lg font-medium text-sky-500 inset-ring inset-ring-sky-500/20">
                            <CogIcon className="size-6"/>
                            <span>{data!["transmission"]}</span>
                        </span>
                    </div>

                    <hr className="text-mist-200"/>

                    <div className="my-5">
                        <h1 className="text-2xl font-bold">Owner</h1>

                        <div className="mt-3 flex items-center gap-5">
                            <img
                                className="rounded-full w-28 h-28 object-cover border-2 border-sky-500"
                                src="https://upload.wikimedia.org/wikipedia/en/6/69/Gustavo_Fring_BCS_S3E10.png"
                                alt="Michael"
                            />

                            <div>
                                <h1 className="text-3xl font-medium">Gus</h1>
                                <h1 className="text-lg">Joined March 2026</h1>
                            </div>
                        </div>
                    </div>

                    <hr className="text-mist-200"/>

                    <div className="mt-5">
                        <h1 className="text-2xl font-bold">Ratings and reviews</h1>

                        <div className="my-5">
                            <h1 className="text-5xl font-bold flex gap-2 items-center text-sky-500">
                                <span>5.0</span>
                                <StarIcon className="size-12"/>
                            </h1>
                            <span>(44 ratings)</span>

                            <div className="mt-5 space-y-5">
                                {reviewCategories.map(cat => (
                                    <div className="flex items-center gap-4">
                                        <h1 className="w-32 whitespace-nowrap">{cat["category"]}</h1>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex-1">
                                            <div className="bg-sky-500 h-full transition-all duration-500 ease-out w-full"></div>
                                        </div>
                                        <h1 className="w-8 text-right">{cat["score"].toFixed(1)}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="">
                            <h1 className="underline font-medium">Reviews</h1>
                            <br />

                            <div className="flex gap-5 border-b border-b-mist-200 py-10">
                                {/* Profile picture */}
                                <img
                                    className="w-20 h-20 object-cover rounded-full"
                                    src="https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png"
                                    alt="Walt"
                                />

                                <div>
                                    <div className="mb-5 space-y-1">
                                        {/* Rating (stars) */}
                                        <div className="flex">
                                            <StarIcon className="size-8 text-sky-500"/>
                                            <StarIcon className="size-8 text-sky-500"/>
                                            <StarIcon className="size-8 text-sky-500"/>
                                            <StarIcon className="size-8 text-sky-500"/>
                                            <StarIcon className="size-8 text-sky-500"/>
                                        </div>

                                        {/* Name/date posted */}
                                        <h1>Walter &bull; <span className="text-mist-600">Feb 14, 2026</span></h1>
                                    </div>

                                    {/* Review body */}
                                    <p>Great car! Super clean. Quick response from owner.</p>
                                </div>
                            </div>

                            <div className="flex gap-5 border-b border-b-mist-200 py-10">
                                {/* Profile picture */}
                                <img
                                    className="w-20 h-20 object-cover rounded-full"
                                    src="https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png"
                                    alt="Walt"
                                />

                                <div>
                                    <div className="mb-5 space-y-1">
                                        {/* Rating (stars) */}
                                        <div className="flex">
                                            <StarIcon className="size-8 text-sky-500"/>
                                            <StarIcon className="size-8 text-sky-500"/>
                                            <StarIcon className="size-8 text-sky-500"/>
                                            <StarIcon className="size-8 text-sky-500"/>
                                            <StarIcon className="size-8 text-sky-500"/>
                                        </div>

                                        {/* Name/date posted */}
                                        <h1>Walter &bull; <span className="text-mist-600">Feb 14, 2026</span></h1>
                                    </div>

                                    {/* Review body */}
                                    <p>Great car! Super clean. Quick response from owner.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Booking form */}
                <div className="col-span-1">
                    <div className="sticky top-10 border border-mist-200 rounded-lg bg-white p-4">
                        <h1 className="text-3xl font-medium pb-2">${data!["pricePerDay"] * 3}.00 total</h1>
                        <hr className="text-mist-200 pb-2"/>

                        <form onSubmit={handleSubmit}>
                            <p className="text-xl font-semibold">Your trip</p>

                            <div className="pt-2">
                                <label htmlFor="trip-start">Trip start</label>

                                <div className="flex gap-2">
                                    <input className="border border-mist-200 rounded w-full p-2" type="date" onChange={e => setTripStartDate(e.target.value)}/>
                                    <input className="border border-mist-200 rounded w-full p-2" type="time" onChange={e => setTripStartTime(e.target.value)}/>
                                </div>
                            </div>

                            <div className="py-2">
                                <label htmlFor="trip-start">Trip end</label>

                                <div className="flex gap-2">
                                    <input className="border border-mist-200 rounded w-full p-2" type="date" onChange={e => setTripEndDate(e.target.value)}/>
                                    <input className="border border-mist-200 rounded w-full p-2" type="time" onChange={e => setTripEndTime(e.target.value)}/>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="trip-start">Pick-up Location</label>
                                <input className="border border-mist-200 rounded w-full p-2" type="text" onChange={e => setPickupLocation(e.target.value)}/>
                            </div>

                            <div className="py-2">
                                <label htmlFor="trip-start">Drop-off Location</label>
                                <input className="border border-mist-200 rounded w-full p-2" type="text" onChange={e => setDropOffLocation(e.target.value)}/>
                            </div>

                            <button className="bg-sky-500 hover:bg-sky-400 transition text-white w-full p-3 font-medium text-xl mt-3 rounded-full cursor-pointer" type="submit">Continue</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default CarDetailPage