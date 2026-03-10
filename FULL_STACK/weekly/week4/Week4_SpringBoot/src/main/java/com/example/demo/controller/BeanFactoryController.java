package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.service.Employee;
import com.example.demo.service.EmployeeService;

@Controller
public class BeanFactoryController {

    @Autowired
    private ApplicationContext context;

    @GetMapping("/beanfactory")
    public String showEmployees(Model model) {
        EmployeeService service = context.getBean(EmployeeService.class);
        model.addAttribute("employees", service.getEmployees());
        return "beanfactory";
    }

    @PostMapping("/addEmployee")
    public String addEmployee(@RequestParam String name, @RequestParam int id) {
        EmployeeService service = context.getBean(EmployeeService.class);
        Employee emp = context.getBean(Employee.class);
        emp.setId(id);
        emp.setName(name);
        service.addEmployee(emp);
        return "redirect:/beanfactory";
    }
}