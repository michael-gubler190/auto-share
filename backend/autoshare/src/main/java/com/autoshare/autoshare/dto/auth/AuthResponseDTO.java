package com.autoshare.autoshare.dto.auth;

import com.autoshare.autoshare.dto.users.UserResponseDTO;

import lombok.Value;

@Value
public class AuthResponseDTO {
    String accessToken;
    String refreshToken;
    UserResponseDTO user;
}
