package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.service.NotificationService;

@Controller
public class NotificationController {

    @Autowired
    @Qualifier("emailService")
    private NotificationService notificationService;

    @GetMapping("/notify")
    public String notifyUser(Model model) {
        model.addAttribute("message", notificationService.sendNotification());
        return "notify";
    }

}