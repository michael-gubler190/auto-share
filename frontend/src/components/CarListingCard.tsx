import { useNavigate } from 'react-router-dom'
import type { CarResponse } from '../types/car'

function CarListingCard(car : CarResponse) {
    const navigate = useNavigate();

  return (
    <div
        className='transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer'
        onClick={() => navigate(`/cars/${car["carId"]}`)}
    >
        <img
            className='rounded-2xl'
            src="https://images.turo.com/media/vehicle/images/C7biWnpiTUirsC3hidS-ew.jpg"
            alt={car["carId"]}
        />

        <div className='my-3'>
            <h1 className='font-bold text-2xl'>
                <span>{car["make"]}</span>
                {" "}
                <span>{car["model"]}</span>
            </h1>

            <div className='flex items-center justify-between'>
                <p className='text-lg'>{car["year"]}</p>
                <p className='text-lg font-medium'>${car["pricePerDay"]}.00/day</p>
            </div>
        </div>
    </div>
  )
}

export default CarListingCard