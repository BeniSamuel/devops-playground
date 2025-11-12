package com.samuel.www.models;

import com.samuel.www.enums.TransactionType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class AccountTransactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    private LocalDateTime occurred_at;

    public AccountTransactions (User owner, Account account, TransactionType transactionType, LocalDateTime occurred_at) {
        this.owner = owner;
        this.account = account;
        this.transactionType = transactionType;
        this.occurred_at = occurred_at;
    }
}
