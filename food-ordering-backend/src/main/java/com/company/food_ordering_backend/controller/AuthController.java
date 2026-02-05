package com.company.food_ordering_backend.controller;

import com.company.food_ordering_backend.model.User;
import com.company.food_ordering_backend.service.AuthService;
import com.company.food_ordering_backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            System.out.println("Register request received:");
            System.out.println("Username: " + request.getUserName());
            System.out.println("Password: " + request.getPassword());
            System.out.println("Role: " + request.getRole());
            System.out.println("Email: " + request.getEmail());
            
            User user = authService.register(
                    request.getUserName(),
                    request.getPassword(),
                    request.getRole(),
                    request.getEmail()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (RuntimeException e) {
            System.out.println("Registration error: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = authService.login(
                request.getEmail(),
                request.getPassword()
        );
        String token = JwtUtil.generateToken(
                user.getId(),
                user.getRole()
        );
        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole()
        ));
    }
}

