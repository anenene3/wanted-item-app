package io.github.anenene3.wanteditemapp.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.anenene3.wanteditemapp.dto.UserForm;
import io.github.anenene3.wanteditemapp.service.UserService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SignUpController {

    private final UserService userService;

    public SignUpController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/accounts")
    public String insert(@Valid @RequestBody UserForm userForm, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return bindingResult.getFieldError().getDefaultMessage();
        }

        int count = userService.insert(userForm);

        if (count == 1) {
            return "登録成功";
        }

        if (count == 0) {
            return "ログインID重複";
        }

        return "登録失敗";
    }
}