package com.autoshare.autoshare.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.autoshare.autoshare.dto.cars.CarRequestDTO;
import com.autoshare.autoshare.dto.cars.CarResponseDTO;
import com.autoshare.autoshare.entity.Car;
import com.autoshare.autoshare.exceptions.ForbiddenException;
import com.autoshare.autoshare.exceptions.ResourceNotFoundException;
import com.autoshare.autoshare.mapper.CarMapper;
import com.autoshare.autoshare.repository.CarRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;
    private final CarMapper carMapper;


    public CarResponseDTO createCar(CarRequestDTO dto, String userId) {
        Car car = carMapper.toEntity(dto);

        car.setCarId(UUID.randomUUID().toString());
        car.setUserId(userId);
        
        carRepository.save(car);
        return carMapper.toResponseDTO(car);
    }


    public List<CarResponseDTO> getAllCars() {
        return carRepository.findAll()
            .stream()
            .map(carMapper::toResponseDTO)
            .collect(Collectors.toList());
    }


    public CarResponseDTO getCarById(String carId) {
        Car car = carRepository.findById(carId)
            .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + carId));
        
        return carMapper.toResponseDTO(car);
    }


    public CarResponseDTO updateCar(String carId, CarRequestDTO dto, String userId) {
        Car car = carRepository.findById(carId)
            .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + carId));

        if (!car.getUserId().equals(userId)) {
            throw new ForbiddenException("You do not own this car");
        }

        carMapper.updateEntity(car, dto);
        carRepository.save(car);
        return carMapper.toResponseDTO(car);
    }


    public void deleteCar(String carId, String userId) {
        Car car = carRepository.findById(carId)
            .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + carId));

        if (!car.getUserId().equals(userId)) {
            throw new ForbiddenException("You do not own this car");
        }

        carRepository.delete(car);
    }
}
