package com.autoshare.autoshare.mapper;

import org.springframework.stereotype.Component;

import com.autoshare.autoshare.dto.CarRequestDTO;
import com.autoshare.autoshare.dto.CarResponseDTO;
import com.autoshare.autoshare.entity.Car;

@Component
public class CarMapper {
    public CarResponseDTO toResponseDTO(Car car) {
        return new CarResponseDTO(
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


    public Car toEntity(CarRequestDTO dto) {
        Car car = new Car();
        
        car.setMake(dto.getMake());
        car.setModel(dto.getModel());
        car.setYear(dto.getYear());
        car.setDescription(dto.getDescription());
        car.setNumberOfSeats(dto.getNumberOfSeats());
        car.setPowerType(dto.getPowerType());
        car.setMilesPerGallon(dto.getMilesPerGallon());
        car.setDistanceWithFullCharge(dto.getDistanceWithFullCharge());
        car.setTransmission(dto.getTransmission());
        car.setPricePerDay(dto.getPricePerDay());

        return car;
    }


    public void updateEntity(Car car, CarRequestDTO dto) {
        car.setMake(dto.getMake());
        car.setModel(dto.getModel());
        car.setYear(dto.getYear());
        car.setDescription(dto.getDescription());
        car.setNumberOfSeats(dto.getNumberOfSeats());
        car.setPowerType(dto.getPowerType());
        car.setMilesPerGallon(dto.getMilesPerGallon());
        car.setDistanceWithFullCharge(dto.getDistanceWithFullCharge());
        car.setTransmission(dto.getTransmission());
        car.setPricePerDay(dto.getPricePerDay());
    }
}
