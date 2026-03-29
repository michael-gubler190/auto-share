package com.autoshare.autoshare.dto.users;

import java.time.OffsetDateTime;
import lombok.Value;

@Value
public class UserResponseDTO {
    private String userId;
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private String profilePicturePath;
    private String role;
    private OffsetDateTime createdAt;
}
