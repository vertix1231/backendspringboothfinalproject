package com.juaracoding.pcmspringbootcsr.repo;

import com.juaracoding.pcmspringbootcsr.model.Penjualan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PenjualanRepo  extends JpaRepository<Penjualan,Long> {

    Page<Penjualan> findByIsActive(Pageable page , Boolean isActive);
    List<Penjualan> findByIsActive(Boolean isActive);//penambahan 21-12-2023
    Optional<Penjualan> findByIsActiveAndIdPenjualan(Boolean isActive, Long values);
    Page<Penjualan> findByIsActiveAndIdPenjualan(Pageable page,Boolean isActive, Long values);
    Page<Penjualan> findByIsActiveAndStruk(Pageable page,Boolean isActive, String values);
}
