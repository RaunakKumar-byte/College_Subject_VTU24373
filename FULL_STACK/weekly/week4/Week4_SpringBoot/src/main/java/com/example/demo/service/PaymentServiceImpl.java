package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    public String processPayment() {
        return "Payment processed successfully";
    }

}