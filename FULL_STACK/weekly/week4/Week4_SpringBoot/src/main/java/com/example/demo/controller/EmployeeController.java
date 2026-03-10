package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EmployeeController {

    @GetMapping("/employee")
    public String employee(Model model) {

        model.addAttribute("name","Raunak Kumar");
        model.addAttribute("role","Software Engineer");

        return "employee";
    }

}