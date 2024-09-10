package com.juaracoding.pcmspringbootcsr.repo;

import com.juaracoding.pcmspringbootcsr.model.KategoriBuku;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KategoriBukuRepo extends JpaRepository<KategoriBuku,Long> {

    Page<KategoriBuku> findByIsActive(Pageable page , Boolean isActive);
    List<KategoriBuku> findByIsActive(Boolean isActive);//penambahan 21-12-2023
    Optional<KategoriBuku> findByIsActiveAndIdKategoriBuku(Boolean isActive, Long values);
    Page<KategoriBuku> findByIsActiveAndIdKategoriBuku(Pageable page, Boolean isActive, Long values);
    Page<KategoriBuku> findByIsActiveAndNamaKategoriBukuContainsIgnoreCase(Pageable page , Boolean isActive, String values);
}
