package com.samuel.www.repositories;

import com.samuel.www.models.AccountTransactions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountTransactionRepository extends JpaRepository<AccountTransactions, Long> {
}
