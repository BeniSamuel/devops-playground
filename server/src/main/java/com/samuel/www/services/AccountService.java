package com.samuel.www.services;

import com.samuel.www.dtos.CreateAccountDto;
import com.samuel.www.enums.AccountType;
import com.samuel.www.exceptions.NotFoundException;
import com.samuel.www.models.Account;
import com.samuel.www.models.User;
import com.samuel.www.repositories.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final UserService userService;

    public List<Account> getAllAccounts () {
        return accountRepository.findAll();
    }

    public List<Account> getAccountsByAccountType (AccountType accountType) {
        return accountRepository.getAccountsByAccountType(accountType);
    }

    public List<Account> getAccountsByOwner (UUID user_id) {
        User owner = userService.getUserById(user_id);
        return accountRepository.getAccountsByOwner(owner);
    }

    public Account getAccountById (UUID id) {
        return accountRepository.findById(id).orElseThrow(() -> new NotFoundException("Account not found!!!"));
    }

    public Account createAccount (CreateAccountDto createAccountDto) {
        User user = userService.getUserById(createAccountDto.getUser_id());
        // creating a new account
        Account new_account = new Account(user, createAccountDto.getAccountType(), createAccountDto.getCreated_at());
        return accountRepository.save(new_account);
    }

   public Account updateAccountById (UUID id, CreateAccountDto accountDto) {
        Account account = getAccountById(id);
        // updating account

       account.setAccountType(account.getAccountType());
       account.setCreated_at(accountDto.getCreated_at());

       return accountRepository.save(account);
   }

   public Boolean deleteAccountById (UUID id) {
        Account account = getAccountById(id);
        // delete account then
       accountRepository.delete(account);
       return true;
   }
}
