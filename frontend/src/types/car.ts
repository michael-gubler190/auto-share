export interface CarResponse {
    carId: string;
    userId: string;
    make: string;
    model: string;
    year: number;
    numberOfSeats?: number;
    powerType?: "gas" | "electric";
    milesPerGallon?: number;
    distanceWithFullCharge?: number;
    transmission?: string;
    pricePerDay: number;
    createdAt: string;
}