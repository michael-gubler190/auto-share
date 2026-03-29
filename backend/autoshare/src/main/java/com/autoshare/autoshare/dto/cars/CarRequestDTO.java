package com.autoshare.autoshare.dto.cars;

import com.autoshare.autoshare.enums.PowerType;
import com.autoshare.autoshare.enums.Transmission;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CarRequestDTO {

    @NotBlank(message = "Make is required")
    private String make;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 1886, message = "Year must be valid")
    private Integer year;

    private String description;

    private Integer numberOfSeats;

    private PowerType powerType;

    private Double milesPerGallon;

    private Double distanceWithFullCharge;

    private Transmission transmission;

    @NotNull(message = "Price per day is required")
    @Min(value = 1, message = "Price per day must be at least 1")
    private Double pricePerDay;
}
