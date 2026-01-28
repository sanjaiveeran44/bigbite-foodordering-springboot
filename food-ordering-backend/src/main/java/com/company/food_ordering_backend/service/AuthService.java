package com.company.food_ordering_backend.service;

import com.company.food_ordering_backend.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class AuthService {
    private final UserDAO userDao;

    public AuthService(UserDAO userDao){
        this.userDao = userDao;
    }

    public User registerUser(String userName, String password, String role){
        Optional<User> existingUser = userDao.findByUsername(userName);
        if(!existingUser.isPresent()){
            throw new RuntimeException("User already exist !");
        }

        String passwordHash = hashPassword(password);
        Long userId = userDao.createUser(userName, passwordHash, role);

        return new User(userId,userName,passwordHash,role);
    }

    public User loginUser(String userName, String password){
        User user = userDao.findByUsername(userName)
        .orElseThrow(() -> new RuntimeException("Invalid username or passwor"));

        if(!verifyPassword(password,user.getPasswordHash())){
            throw new RuntimeException("invalid password");
        }

        return user;
    }
    private String hashPassword(String rawPassword){
        return Integer.toHexString(rawPassword.hashCode());
    }
    private boolean verifyPassword(String rawPassword, String passwordHash){
        return passwordHash.equals(hashPassword(rawPassword));
    }
}
