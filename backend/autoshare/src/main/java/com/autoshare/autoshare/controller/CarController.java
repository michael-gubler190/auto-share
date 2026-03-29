package com.autoshare.autoshare.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoshare.autoshare.dto.ApiResponse;
import com.autoshare.autoshare.dto.cars.CarRequestDTO;
import com.autoshare.autoshare.dto.cars.CarResponseDTO;
import com.autoshare.autoshare.security.SecurityUtil;
import com.autoshare.autoshare.service.CarService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;
    
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<CarResponseDTO>> createCar(@Valid @RequestBody CarRequestDTO dto) {
        String userId = SecurityUtil.getCurrentUserId();
        CarResponseDTO car = carService.createCar(dto, userId);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("Car listing created successfully", car));
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<CarResponseDTO>>> getAllCars() {
        List<CarResponseDTO> cars = carService.getAllCars();

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success(cars));
    }


    @GetMapping("/{carId}")
    public ResponseEntity<ApiResponse<CarResponseDTO>> getCarById(@PathVariable String carId) {
        CarResponseDTO car = carService.getCarById(carId);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success(car));
    }


    @PutMapping("/{carId}")
    public ResponseEntity<ApiResponse<CarResponseDTO>> updateCar(@PathVariable String carId, @Valid @RequestBody CarRequestDTO dto) {
        String userId = SecurityUtil.getCurrentUserId();
        CarResponseDTO car = carService.updateCar(carId, dto, userId);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Car listing updated successfully", car));
    }


    @DeleteMapping("/{carId}")
    public ResponseEntity<ApiResponse<Void>> deleteCar(@PathVariable String carId) {
        String userId = SecurityUtil.getCurrentUserId();
        carService.deleteCar(carId, userId);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Car listing deleted successfully", null));
    }
}
