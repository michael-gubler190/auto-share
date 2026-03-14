import { useQuery } from "@tanstack/react-query";
import { carService } from "../services/carService";


// Query keys as constants
export const CAR_KEYS = {
    all: ["cars"] as const,
    byId: (carId: string) => ["cars", carId] as const,
};


export const useCars = () => {
    return useQuery({
        queryKey: CAR_KEYS.all,
        queryFn: carService.getAll,
        staleTime: 1000 * 60 * 5,
    });
};


export const useCarById = (carId: string) => {
    return useQuery({
        queryKey: CAR_KEYS.byId(carId),
        queryFn: () => carService.getById(carId),
        enabled: !!carId
    });
}
