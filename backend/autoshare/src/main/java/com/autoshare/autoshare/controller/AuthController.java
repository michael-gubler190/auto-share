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
import com.autoshare.autoshare.exceptions.UnauthorizedException;
import com.autoshare.autoshare.security.CookieUtil;
import com.autoshare.autoshare.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserService userService;
    private final CookieUtil cookieUtil;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> register(@Valid @RequestBody UserRequestDTO requestDTO, HttpServletResponse response) {
        AuthResponseDTO auth = userService.register(requestDTO);

        cookieUtil.addAccessTokenCookie(response, auth.getAccessToken());
        cookieUtil.addRefreshTokenCookie(response, auth.getRefreshToken());

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success("User registered successfully", auth.getUser()));
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserResponseDTO>> login(@Valid @RequestBody LoginRequestDTO dto, HttpServletResponse response) {
        AuthResponseDTO auth = userService.login(dto);

        cookieUtil.addAccessTokenCookie(response, auth.getAccessToken());
        cookieUtil.addRefreshTokenCookie(response, auth.getRefreshToken());

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Login successful", auth.getUser()));
    }


    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Void>> refresh(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = cookieUtil.extractRefreshToken(request)
            .orElseThrow(() -> new UnauthorizedException("Refresh token missing"));

        RefreshTokenRequestDTO refreshTokenRequestDTO = new RefreshTokenRequestDTO();
        refreshTokenRequestDTO.setRefreshToken(refreshToken);

        AuthResponseDTO auth = userService.refresh(refreshTokenRequestDTO);

        cookieUtil.addAccessTokenCookie(response, auth.getAccessToken());
        cookieUtil.addRefreshTokenCookie(response, auth.getRefreshToken());

        return ResponseEntity.ok(ApiResponse.success("Token refreshed", null));
    }


    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response) {
        cookieUtil.clearCookies(response);
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", null));
    }
}
