package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TestComponent {

    @Autowired(required=false)
    private OptionalComponent optionalComponent;

    public void showMessage() {

        if(optionalComponent != null)
            System.out.println(optionalComponent.message());
        else
            System.out.println("Optional component not available");

    }

}