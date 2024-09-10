package com.juaracoding.pcmspringbootcsr.repo;

import com.juaracoding.pcmspringbootcsr.model.Akses;
import com.juaracoding.pcmspringbootcsr.model.Pengarang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PengarangRepo extends JpaRepository<Pengarang,Long> {

    List<Pengarang> findByIsActive(Boolean isActive);
    Page<Pengarang> findByIsActive(Pageable page , Boolean isActive);
    Optional<Pengarang> findByIsActiveAndIdPengarang(Boolean isActive, Long values);
    Page<Pengarang> findByIsActiveAndIdPengarang(Pageable page,Boolean isActive, Long values);
    Page<Pengarang> findByIsActiveAndNamaPengarangContainsIgnoreCase(Pageable page , Boolean isActive, String values);
    Page<Pengarang> findByIsActiveAndAlamatContainsIgnoreCase(Pageable page , Boolean isActive, String values);

}