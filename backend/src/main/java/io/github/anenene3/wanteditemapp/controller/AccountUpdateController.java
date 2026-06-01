package io.github.anenene3.wanteditemapp.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import io.github.anenene3.wanteditemapp.service.UserService;
import jakarta.validation.Valid;
import io.github.anenene3.wanteditemapp.dto.AccountUpdateForm;
import io.github.anenene3.wanteditemapp.dto.AccountEditDto;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AccountUpdateController {

    private final UserService userService;

    public AccountUpdateController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/accounts/{userId}")
    public AccountEditDto findById(@PathVariable Long userId) {
        return userService.findLoginUserById(userId);
    }

    @PutMapping("/accounts/{userId}")
    public String update(@PathVariable long userId, @Valid @RequestBody AccountUpdateForm accountUpdateForm, BindingResult bindingResult) {
        accountUpdateForm.setUserId(userId);

        if (bindingResult.hasErrors()) {
            return bindingResult.getFieldError().getDefaultMessage();
        }

        int count = userService.update(accountUpdateForm);

        if (count == 1) {
            return "更新成功";
        }

        return "更新失敗";
    }

    @DeleteMapping("/accounts/{userId}")
    public String delete(@PathVariable long userId) {
        int count = userService.delete(userId);

        if (count == 1) {
            return "削除成功";
        }

        return "削除失敗";
    }
}