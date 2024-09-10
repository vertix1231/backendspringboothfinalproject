package com.juaracoding.pcmspringbootcsr.controller;


import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/cobain")
public class CobainController {
    @PostMapping("/uploadimage")
    public Object submitFile(@RequestParam(value = "kiriman") MultipartFile file,
                             HttpServletResponse response) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = "C:/";

        return "";
    }

    @GetMapping("/welcome")
    public String hello(){

        return "Hello";
    }



}