package com.autoshare.autoshare.service;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.autoshare.autoshare.dto.UserRequestDTO;
import com.autoshare.autoshare.dto.UserResponseDTO;
import com.autoshare.autoshare.entity.User;
import com.autoshare.autoshare.enums.UserRole;
import com.autoshare.autoshare.exceptions.ConflictException;
import com.autoshare.autoshare.mapper.UserMapper;
import com.autoshare.autoshare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO register(UserRequestDTO userRequest) {
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new ConflictException("Email is already in use");
        }

        if (userRequest.getUsername() != null && userRepository.existsByUsername(userRequest.getUsername())) {
            throw new ConflictException("Username is already taken");
        }

        if (userRequest.getPhone() != null && userRepository.existsByPhone(userRequest.getPhone())) {
            throw new ConflictException("Phone number is already in use");
        }

        User user = userMapper.toEntity(userRequest);
        user.setUserId(UUID.randomUUID().toString());
        user.setPasswordHash(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(UserRole.renter);

        userRepository.save(user);

        return userMapper.toResponseDTO(user);
    }
}
