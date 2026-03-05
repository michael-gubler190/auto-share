package com.autoshare.autoshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.autoshare.autoshare.entity.User;

interface UserRepository extends JpaRepository<User, String> {
    
}
