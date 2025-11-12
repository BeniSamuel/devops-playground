package com.samuel.www.dtos;

import com.samuel.www.enums.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RegisterDto {
    private String name;
    private String email;
    private String password;
    private Role role;
    private final LocalDateTime joined_at = LocalDateTime.now();
}
