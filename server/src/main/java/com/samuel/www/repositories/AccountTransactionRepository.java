package com.samuel.www.repositories;

import com.samuel.www.models.AccountTransactions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccountTransactionRepository extends JpaRepository<AccountTransactions, UUID> {
}
