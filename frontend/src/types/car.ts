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


export const PowerType = {
    gas: "gas",
    electric: "electric"
} as const;

export interface CarRequest {
    make: string;
    model: string;
    year: number;
    description?: string;
    numberOfSeats?: number;
    powerType?: "gas" | "electric";
    milesPerGallon?: number;
    distanceWithFullCharge?: number;
    transmission?: "AT" | "MT" | "CVT" | "DCT";
    pricePerDay: number;
}