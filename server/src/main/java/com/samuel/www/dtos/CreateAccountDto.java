package com.samuel.www.dtos;

import com.samuel.www.enums.AccountType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class CreateAccountDto {
    private UUID user_id;
    private AccountType accountType;
    private final LocalDateTime created_at = LocalDateTime.now();
}
