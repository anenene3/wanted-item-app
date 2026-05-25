package io.github.anenene3.wanteditemapp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("io.github.anenene3.wanteditemapp.mapper")
public class WantedItemAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(WantedItemAppApplication.class, args);
    }
}