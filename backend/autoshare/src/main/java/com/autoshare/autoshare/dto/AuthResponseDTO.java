package com.autoshare.autoshare.dto;

import lombok.Value;

@Value
public class AuthResponseDTO {
    String accessToken;
    String refreshToken;
    UserResponseDTO user;
}
