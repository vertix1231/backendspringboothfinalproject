package com.juaracoding.pcmspringbootcsr.repo;

import com.juaracoding.pcmspringbootcsr.model.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MenuRepo extends JpaRepository<Menu,Long> {

    Page<Menu> findByIsActive(Pageable page , Boolean isActive);
    List<Menu> findByIsActive(Boolean isActive);//penambahan 21-12-2023
    Optional<Menu> findByIsActiveAndIdMenu(Boolean isActive, Long values);
    Page<Menu> findByIsActiveAndIdMenu(Pageable page,Boolean isActive, Long values);
    Page<Menu> findByIsActiveAndNamaMenuContainsIgnoreCase(Pageable page , Boolean isActive, String values);
    Page<Menu> findByIsActiveAndPathMenuContainsIgnoreCase(Pageable page , Boolean isActive, String values);

    @Query("SELECT x FROM Akses x WHERE x.divisi.namaDivisi LIKE CONCAT('%',?2,'%') AND x.isActive = ?1 ")
    Page<Menu> findByIsActiveAndEndPointContainsIgnoreCase(Pageable page , Boolean isActive, String values);

}
