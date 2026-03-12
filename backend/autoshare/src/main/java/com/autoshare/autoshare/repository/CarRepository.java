package com.autoshare.autoshare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.autoshare.autoshare.entity.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, String> {
    List<Car> findByUserId(String userId);
}
