import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useState, type ChangeEvent, type SubmitEvent } from "react"
import { useCarsCreate } from "../hooks/useCars";

function CreateListingForm() {
  const createCarMutation = useCarsCreate();

  // Hold state for each field
  const [descriptors, setDescriptors] = useState({
    make: "",
    model: "",
    year: 1867,
    description: ""
  });
  const [numberOfSeats, setNumberOfSeats] = useState(2);
  const [powerType, setPowerType] = useState<"gas" | "electric" | undefined>(undefined);
  const [transmission, setTransmission] = useState<"AT" | "MT" | "CVT" | "DCT" | undefined>(undefined);
  const [rate, setRate] = useState(15);


  // Handle change of descriptor fields
  function handleDescriptorChange(event: ChangeEvent<HTMLInputElement>) {
    setDescriptors({
      ...descriptors,
      [event.target.name]: event.target.value
    });
  }
  // END Handle change of descriptor fields


  // Used to change number of seats
  function incrementSeats() {
    if (numberOfSeats >= 10) return;
    setNumberOfSeats(prevNum => prevNum + 1);
  }

  function decrementSeats() {
    if (numberOfSeats <= 2) return;
    setNumberOfSeats(prevNum => prevNum - 1);
  }
  // END Used to change number of seats


  // Handle create listing form submission
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    createCarMutation.mutate(
        {
        ...descriptors,
        numberOfSeats: numberOfSeats,
        powerType: powerType,
        milesPerGallon: 10,
        distanceWithFullCharge: 150,
        transmission: transmission,
        pricePerDay: rate
      },
      {
        onSuccess: (response) => {
          console.log(response);
        }
      }
    )
  }
  // END Handle create listing form submission

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-3 gap-5">
        <input onChange={handleDescriptorChange} name="make" value={descriptors["make"]} className='border border-mist-300 rounded-md p-3 col-span-1 focus:outline-1 focus:outline-sky-500' type="text" placeholder="Make" />
        <input onChange={handleDescriptorChange} name="model" value={descriptors["model"]} className='border border-mist-300 rounded-md p-3 col-span-1 focus:outline-1 focus:outline-sky-500' type="text" placeholder="Model"/>
        <input onChange={handleDescriptorChange} name="year" value={descriptors["year"]} className='border border-mist-300 rounded-md p-3 col-span-1 focus:outline-1 focus:outline-sky-500' type="number" placeholder="Year"/>
      </div>

      <div className="grid grid-cols-1">
        <textarea onChange={(e) => setDescriptors({...descriptors, "description": e.target.value})} name="description" value={descriptors["description"]} className='border border-mist-300 rounded-md p-3 focus:outline-1 focus:outline-sky-500' id="carDescription" placeholder="Description" rows={4}></textarea>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-bold">Number of seats</p>

        <div className="flex align-middle items-center gap-3">
          <MinusIcon onClick={decrementSeats} className="size-5"/>
          {numberOfSeats}
          <PlusIcon onClick={incrementSeats} className="size-5"/>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-bold">Power type</p>

        <div>

          <div className="flex items-center mb-4">
            <input onChange={() => setPowerType("gas")} id="gas-radio" type="radio" value="" name="power_type" className=""/>
            <label htmlFor="gas-radio" className="select-none ms-2 text-sm font-medium text-heading">Gas</label>
          </div>

          <div className="flex items-center">
              <input onChange={() => setPowerType("electric")} id="electric-radio" type="radio" value="" name="power_type" className=""/>
              <label htmlFor="electric-radio" className="select-none ms-2 text-sm font-medium text-heading">Electric</label>
          </div>
        </div>
      </div>

      {powerType === "gas" && (
        <div className="space-y-2">
          <p className="font-bold">Miles per gallon</p>
          <input className="w-full border border-mist-300 rounded-md p-3 focus:outline-1 focus:outline-sky-500" type="number" name="milesPerGallon" placeholder="Miles per gallon"/>
        </div>
      )}

      {powerType === "electric" && (
        <div className="space-y-2">
          <p className="font-bold">Miles per full charge</p>
          <input className="w-full border border-mist-300 rounded-md p-3 focus:outline-1 focus:outline-sky-500" type="number" name="distanceWithFullCharge" placeholder="Miles per full charge"/>
        </div>
      )}


      <div className="space-y-2">
        <p className="font-bold">Transmission</p>

        <div>
          <select onChange={e => setTransmission(e.target.value as "AT" | "MT" | "CVT" | "DCT")} id="transmissions" className="w-full border border-mist-300 rounded-md p-3 focus:outline-1 focus:outline-sky-500">
            <option value="">Choose a transmission</option>
            <option value="AT">Automatic Transmission</option>
            <option value="MT">Manual Transmission</option>
            <option value="CVT">Continuously Variable Transmission</option>
            <option value="DCT">Dual-Clutch Transmission</option>
          </select>

        </div>
      </div>


      <div className="flex justify-between items-center">
        <p className="font-bold">Rate</p>

        <div className="flex align-middle items-center gap-3">
          <p>$</p>
          <input value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} placeholder="00.00" type="number" className="border border-mist-300 rounded-md p-3 focus:outline-1 focus:outline-sky-500"/>
          <p>/day</p>
        </div>
      </div>


      <button type="submit" className='w-full bg-sky-500 hover:bg-sky-400 transition text-white p-2 font-medium text-md mt-3 rounded-full cursor-pointer'>Submit</button>
    </form>
  )
}

export default CreateListingForm