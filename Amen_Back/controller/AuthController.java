package com.example.Amen_Back.controller;

import com.example.Amen_Back.model.User;
import com.example.Amen_Back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        userService.registerUser(user);
        return "Registration successful! Please check your email and SMS for the verification code.";
    }

    @GetMapping("/verify")
    public String verifyUser(@RequestParam("code") String code) {
        if (userService.verifyUser(code)) {
            return "Verification successful!";
        } else {
            return "Invalid verification code.";
        }
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                return "Login successful!";
            } else {
                return "Login failed!";
            }
        } catch (AuthenticationException e) {
            return "Login failed!";
        }
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody String email) {
        userService.resetPassword(email);
        return "Password reset email sent!";
    }

    @PostMapping("/update-password")
    public String updatePassword(@RequestParam("resetCode") String resetCode, @RequestBody String newPassword) {
        if (userService.updatePassword(resetCode, newPassword)) {
            return "Password updated successfully!";
        } else {
            return "Invalid reset code!";
        }
    }
}