package com.samuel.www.controllers;

import com.samuel.www.models.Account;
import com.samuel.www.services.AccountService;
import com.samuel.www.utils.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/nziza-banking/account")
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Account>>> getAllAccounts () {
        return ApiResponse.ok("Successfully obtained all account!!! ✅✅✅", accountService.getAllAccounts());
    }

    @GetMapping("/{id}")
    public  ResponseEntity<ApiResponse<Account>> getAccountById (@PathVariable UUID id) {
        return ApiResponse.ok("Successfully obtained account!!! ✅✅✅", accountService.getAccountById(id));
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<ApiResponse<List<Account>>> getAccountsByUser (@PathVariable UUID user_id) {
        return ApiResponse.ok("Successfully obtained account by user!!! ✅✅✅", accountService.getAccountsByOwner(user_id));
    }
}
