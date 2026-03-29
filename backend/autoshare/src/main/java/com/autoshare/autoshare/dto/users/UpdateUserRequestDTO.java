package com.autoshare.autoshare.dto.users;

import lombok.Data;

@Data
public class UpdateUserRequestDTO {
    private String fullName;
    private String username;
    private String phone;
    private String profilePicturePath;
}
