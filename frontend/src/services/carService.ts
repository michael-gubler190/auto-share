import type { CarResponse } from "../types/car";
import api from "./api";


export const carService = {
    getAll: async (): Promise<CarResponse[]> => {
        const response = await api.get("/api/cars");
        return response.data.data;
    },

    getById: async (carId: string): Promise<CarResponse> => {
        const response = await api.get(`/api/cars/${carId}`);
        return response.data.data;
    }
}
