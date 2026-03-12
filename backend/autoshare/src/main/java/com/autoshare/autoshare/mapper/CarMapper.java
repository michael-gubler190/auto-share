package com.autoshare.autoshare.mapper;

import org.springframework.stereotype.Component;

import com.autoshare.autoshare.dto.CarResponse;
import com.autoshare.autoshare.entity.Car;

@Component
public class CarMapper {
    public CarResponse toResponseDTO(Car car) {
        return new CarResponse(
            car.getCarId(),
            car.getUserId(),
            car.getMake(),
            car.getModel(),
            car.getNumberOfSeats(),
            car.getPowerType(),
            car.getMilesPerGallon(),
            car.getDistanceWithFullCharge(),
            car.getTransmission(),
            car.getPricePerDay(),
            car.getCreatedAt()
        );
    }
}
