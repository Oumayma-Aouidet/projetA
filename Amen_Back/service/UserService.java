package com.example.Amen_Back.service;

import com.example.Amen_Back.model.User;
import com.example.Amen_Back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);
        user.setVerificationCode(UUID.randomUUID().toString());
        User savedUser = userRepository.save(user);
        sendVerificationCode(savedUser);
        return savedUser;
    }

    public void sendVerificationCode(User user) {
        emailService.sendEmail(user.getEmail(), "Verification Code", "Your verification code is: " + user.getVerificationCode());
        smsService.sendSms(user.getPhoneNumber(), "Your verification code is: " + user.getVerificationCode());
    }

    public boolean verifyUser(String code) {
        Optional<User> user = userRepository.findByVerificationCode(code);
        if (user.isPresent()) {
            User verifiedUser = user.get();
            verifiedUser.setEnabled(true);
            verifiedUser.setVerificationCode(null);
            userRepository.save(verifiedUser);
            return true;
        }
        return false;
    }

    public void resetPassword(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String resetCode = UUID.randomUUID().toString();
            user.setVerificationCode(resetCode);
            userRepository.save(user);
            emailService.sendEmail(user.getEmail(), "Password Reset", "Your password reset code is: " + resetCode);
        }
    }

    public boolean updatePassword(String resetCode, String newPassword) {
        Optional<User> userOptional = userRepository.findByVerificationCode(resetCode);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setVerificationCode(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}