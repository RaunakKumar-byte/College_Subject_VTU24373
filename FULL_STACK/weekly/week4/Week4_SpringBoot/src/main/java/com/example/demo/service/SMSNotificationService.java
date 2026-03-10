package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service("smsService")
public class SMSNotificationService implements NotificationService {

    public String sendNotification() {
        return "SMS Notification Sent";
    }

}