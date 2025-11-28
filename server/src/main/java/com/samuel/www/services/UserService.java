package com.samuel.www.services;

import com.samuel.www.dtos.RegisterDto;
import com.samuel.www.exceptions.BadRequestException;
import com.samuel.www.exceptions.NotFoundException;
import com.samuel.www.models.User;
import com.samuel.www.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers () {
        return this.userRepository.findAll();
    }

    public User getUserById (UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found!!!"));
    }

    public User getUserByEmail (String email) {
        return userRepository.getUserByEmail(email).orElseThrow(() -> new NotFoundException("User not found!!!"));
    }

    public User createUser (RegisterDto registerDto) {
        boolean exist = userRepository.getUserByEmail(registerDto.getEmail()).isPresent();
        if (exist) {
            throw new BadRequestException("User with that email already exist!!!");
        }
        User newUser = new User(registerDto.getName(), registerDto.getEmail(), registerDto.getPassword(), registerDto.getRole(), registerDto.getJoined_at());
        return userRepository.save(newUser);
    }

    public User updateUserById (UUID id, RegisterDto registerDto) {
        User user = getUserById(id);

        user.setEmail(registerDto.getEmail());
        user.setName(registerDto.getName());
        user.setPassword(registerDto.getPassword());
        user.setRole(registerDto.getRole());

        return this.userRepository.save(user);
    }

    public Boolean deleteUserById (UUID id) {
        User user = getUserById(id);
        userRepository.delete(user);
        return true;
    }
}
