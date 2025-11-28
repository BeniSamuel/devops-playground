package com.samuel.www.repositories;

import com.samuel.www.enums.AccountType;
import com.samuel.www.models.Account;
import com.samuel.www.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AccountRepository extends JpaRepository <Account, UUID> {
    List<Account> getAccountsByAccountType (AccountType accountType);
    List<Account> getAccountsByOwner(User owner);
}
