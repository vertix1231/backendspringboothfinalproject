package com.juaracoding.pcmspringbootcsr.repo;

import com.juaracoding.pcmspringbootcsr.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepo extends JpaRepository<Item,Long> {
    Page<Item> findByIsActive(Pageable page , Boolean isActive);
    List<Item> findByIsActive(Boolean isActive);//penambahan 21-12-2023
    Optional<Item> findByIsActiveAndIdItem(Boolean isActive, Long values);
    Page<Item> findByIsActiveAndIdItem(Pageable page,Boolean isActive, Long values);
    Page<Item> findByIsActiveAndNamaItemContainsIgnoreCase(Pageable page , Boolean isActive, String values);
}