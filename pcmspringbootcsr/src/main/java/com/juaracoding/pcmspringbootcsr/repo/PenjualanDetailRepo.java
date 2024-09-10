package com.juaracoding.pcmspringbootcsr.repo;

import com.juaracoding.pcmspringbootcsr.model.PenjualanDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PenjualanDetailRepo extends JpaRepository<PenjualanDetail,Long> {

    Page<PenjualanDetail> findByIsActive(Pageable page , Boolean isActive);
    List<PenjualanDetail> findByIsActive(Boolean isActive);//penambahan 21-12-2023
    Optional<PenjualanDetail> findByIsActiveAndIdPenjualanDetail(Boolean isActive, Long values);
    Page<PenjualanDetail> findByIsActiveAndIdPenjualanDetail(Pageable page,Boolean isActive, Long values);
}
