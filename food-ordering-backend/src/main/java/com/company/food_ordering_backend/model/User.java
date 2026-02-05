package com.company.food_ordering_backend.model;

public class User {

    private Long id;
    private String username;
    private String passwordHash;
    private String email;
    private String role;

    public User() {}

    public User(Long id, String username, String passwordHash, String role, String email) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getRole() {
        return role;
    }

    public String getEmail(){
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setEmail(String email){
        this.email = email;
    }
}
