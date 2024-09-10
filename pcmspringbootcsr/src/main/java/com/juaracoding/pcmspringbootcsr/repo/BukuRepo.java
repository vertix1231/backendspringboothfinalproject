package com.juaracoding.pcmspringbootcsr.repo;

import com.juaracoding.pcmspringbootcsr.model.Buku;
import com.juaracoding.pcmspringbootcsr.model.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BukuRepo extends JpaRepository<Buku,Long> {

    Page<Buku> findByIsActive(Pageable page , Boolean isActive);
    List<Buku> findByIsActive(Boolean isActive);//penambahan 21-12-2023
    Optional<Buku> findByIsActiveAndIdBuku(Boolean isActive, Long values);
    Page<Buku> findByIsActiveAndIdBuku(Pageable page,Boolean isActive, Long values);
    Page<Buku> findByIsActiveAndJudulBukuContainsIgnoreCase(Pageable page , Boolean isActive, String values);
    @Query("SELECT x FROM Buku x WHERE x.isActive = ?1 AND CAST(x.tahunTerbit as string) LIKE CONCAT('%',?2,'%') ")
    Page<Buku> findByIsActiveAndTahunTerbit(Pageable page , Boolean isActive, String values);
    @Query("SELECT x FROM Buku x WHERE x.isActive = ?1 AND x.kategoriBuku.namaKategoriBuku LIKE CONCAT('%',?2,'%')")
    Page<Buku> findByIsActiveAndNamaKategoriBuku(Pageable page , Boolean isActive, String values);

}
