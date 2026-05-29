package io.github.anenene3.wanteditemapp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.anenene3.wanteditemapp.dto.LoginForm;
import io.github.anenene3.wanteditemapp.service.UserService;
import io.github.anenene3.wanteditemapp.dto.LoginUserDto;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginUserDto login(@RequestBody LoginForm loginForm) {
        return userService.login(loginForm);
    }
}