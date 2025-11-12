package com.samuel.www.models;

import com.samuel.www.enums.AccountType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    @Column()
    private Long balance = 0L;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    private LocalDateTime created_at;

    private LocalDateTime deleted_at;

    public Account (User owner, AccountType accountType, LocalDateTime created_at) {
        this.owner = owner;
        this.accountType = accountType;
        this.created_at = created_at;
    }
}
