package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.service.TestComponent;

@Controller
public class OptionalController {

    private final TestComponent testComponent;

    public OptionalController(TestComponent testComponent) {
        this.testComponent = testComponent;
    }

    @GetMapping("/optional")
    public String showOptional(Model model) {
        testComponent.showMessage();
        model.addAttribute("message", "Check console for optional component message.");
        return "optional";
    }
}