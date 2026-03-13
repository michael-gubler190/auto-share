package com.autoshare.autoshare.service;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.autoshare.autoshare.dto.AuthResponseDTO;
import com.autoshare.autoshare.dto.LoginRequestDTO;
import com.autoshare.autoshare.dto.RefreshTokenRequestDTO;
import com.autoshare.autoshare.dto.UserRequestDTO;
import com.autoshare.autoshare.entity.User;
import com.autoshare.autoshare.enums.UserRole;
import com.autoshare.autoshare.exceptions.ConflictException;
import com.autoshare.autoshare.exceptions.ResourceNotFoundException;
import com.autoshare.autoshare.exceptions.UnauthorizedException;
import com.autoshare.autoshare.mapper.UserMapper;
import com.autoshare.autoshare.repository.UserRepository;
import com.autoshare.autoshare.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public AuthResponseDTO refresh(RefreshTokenRequestDTO refreshDTO) {
        String token = refreshDTO.getRefreshToken();

        if (!jwtUtil.isTokenValid(token)) {
            throw new UnauthorizedException("Invalid refresh token");
        }

        String userId = jwtUtil.extractUserId(token);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String newAccessToken = jwtUtil.generateAccessToken(
                user.getUserId(),
                user.getEmail(),
                user.getRole().name()
        );

        String newRefreshToken = jwtUtil.generateRefreshToken(user.getUserId());

        return new AuthResponseDTO(newAccessToken, newRefreshToken, userMapper.toResponseDTO(user));
    }


    public AuthResponseDTO login(LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password");
        }
        
        
        String accessToken = jwtUtil.generateAccessToken(user.getUserId(), user.getEmail(), user.getRole().name());
        String refreshString = jwtUtil.generateRefreshToken(user.getUserId());

        return new AuthResponseDTO(accessToken, refreshString, userMapper.toResponseDTO(user));
    }


    public AuthResponseDTO register(UserRequestDTO userRequest) {
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

        String accessToken = jwtUtil.generateAccessToken(user.getUserId(), user.getEmail(), user.getRole().name());
        String refreshString = jwtUtil.generateRefreshToken(user.getUserId());

        return new AuthResponseDTO(accessToken, refreshString, userMapper.toResponseDTO(user));
    }
}
