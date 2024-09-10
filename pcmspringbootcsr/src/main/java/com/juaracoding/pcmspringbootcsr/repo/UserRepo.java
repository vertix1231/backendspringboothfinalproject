package com.juaracoding.pcmspringbootcsr.repo;

import com.juaracoding.pcmspringbootcsr.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findByUsernameOrNoHPOrEmailAndIsActive(String username, String noHp, String email,Boolean isActive);
    Optional<User> findByUsernameOrNoHPOrEmail(String username, String noHp, String email);
    Page<User> findByIsActive(Pageable page , byte byteIsDelete);
    List<User> findByIsActive(Boolean isActive);
    public Optional<User> findByEmail(String value);
    public Optional<User> findByUsername(String userName);
}
