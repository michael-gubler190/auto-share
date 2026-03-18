package com.autoshare.autoshare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoshare.autoshare.dto.ApiResponse;
import com.autoshare.autoshare.dto.UpdateUserRequestDTO;
import com.autoshare.autoshare.dto.UserResponseDTO;
import com.autoshare.autoshare.security.SecurityUtil;
import com.autoshare.autoshare.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUser(@Valid @RequestBody UpdateUserRequestDTO dto) {
        String userId = SecurityUtil.getCurrentUserId();
        UserResponseDTO user = userService.updateUser(userId, dto);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Profile updated successfully", user));
    }


    @PatchMapping("/upgrade-to-owner")
    public ResponseEntity<ApiResponse<UserResponseDTO>> upgradeToOwner() {
        String userId = SecurityUtil.getCurrentUserId();
        UserResponseDTO user = userService.upgradeToOwner(userId);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Successfully upgraded to owner", user));
    }
}
