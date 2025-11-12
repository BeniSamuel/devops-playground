package com.samuel.www.models;

import com.samuel.www.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime joined_at;

    public User (String name, String email, String password, Role role, LocalDateTime joined_at) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.joined_at = joined_at;
    }
}
