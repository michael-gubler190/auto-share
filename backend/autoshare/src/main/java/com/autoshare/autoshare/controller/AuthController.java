package com.autoshare.autoshare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoshare.autoshare.dto.ApiResponse;
import com.autoshare.autoshare.dto.AuthResponseDTO;
import com.autoshare.autoshare.dto.LoginRequestDTO;
import com.autoshare.autoshare.dto.RefreshTokenRequestDTO;
import com.autoshare.autoshare.dto.UserRequestDTO;
import com.autoshare.autoshare.dto.UserResponseDTO;
import com.autoshare.autoshare.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> register(@Valid @RequestBody UserRequestDTO requestDTO) {
        UserResponseDTO user = userService.register(requestDTO);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("User registered successfully", user));
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> login(@Valid @RequestBody LoginRequestDTO dto) {
        AuthResponseDTO auth = userService.login(dto);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Login successful", auth));
    }


    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> refresh(@Valid @RequestBody RefreshTokenRequestDTO dto) {
        AuthResponseDTO auth = userService.refresh(dto);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Token refreshed", auth));
    }
}
