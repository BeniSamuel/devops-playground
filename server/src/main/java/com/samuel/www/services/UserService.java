package com.samuel.www.services;

import com.samuel.www.repositories.UserRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
}
