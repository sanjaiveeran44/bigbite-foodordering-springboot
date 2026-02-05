package com.company.food_ordering_backend.controller;

public class RegisterRequest {
    private String userName;
    private String password;
    private String role;
    private String email;

    public String getUserName(){
        return userName;
    }
    public String getPassword(){
        return password;
    }
    public String getRole(){
        return role;
    }
    public String getEmail(){
        return email;
    }
}