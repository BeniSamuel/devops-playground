package com.samuel.www.controllers;

import com.samuel.www.dtos.RegisterDto;
import com.samuel.www.models.User;
import com.samuel.www.services.UserService;
import com.samuel.www.utils.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/nziza-banking/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers () {
        return ApiResponse.ok("Successfully obtained all user!!! ✅✅✅", userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById (@PathVariable UUID id) {
        return ApiResponse.ok("Successfully obtained a user!!! ✅✅✅", userService.getUserById(id));
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<ApiResponse<User>> updateUserById (@PathVariable UUID id, @RequestBody RegisterDto registerDto) {
        return ApiResponse.ok("Successfully updated a user!!! ✅✅✅", userService.updateUserById(id, registerDto));
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<ApiResponse<Boolean>> deleteUserById (@PathVariable UUID id) {
        return ApiResponse.ok("Successfully deleted a user!!! ✅✅✅", userService.deleteUserById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<User>> addUser (@RequestBody RegisterDto registerDto) {
        return ApiResponse.created("Successfully add user!!! ✅✅✅", this.userService.createUser(registerDto));
    }
}
