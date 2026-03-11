package com.autoshare.autoshare.mapper;

import org.springframework.stereotype.Component;

import com.autoshare.autoshare.dto.UserRequestDTO;
import com.autoshare.autoshare.dto.UserResponseDTO;
import com.autoshare.autoshare.entity.User;

@Component
public class UserMapper {
    public UserResponseDTO toResponseDTO(User user) {
        return new UserResponseDTO(
                user.getUserId(),
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                user.getProfilePicturePath(),
                user.getRole() != null ? user.getRole().name() : null,
                user.getCreatedAt()
        );
    }

    public User toEntity(UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setFullName(userRequestDTO.getFullName());
        user.setUsername(userRequestDTO.getUsername());
        user.setEmail(userRequestDTO.getEmail());
        user.setPhone(userRequestDTO.getPhone());
        return user;
    }
}
