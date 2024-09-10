package com.juaracoding.pcmspringbootcsr.dto.pengarang;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.juaracoding.pcmspringbootcsr.dto.buku.BukuDTO;

import java.util.List;

public class PengarangOptionDTO {
    private Long idPengarang;

    private String namaPengarang;

    public Long getIdPengarang() {
        return idPengarang;
    }

    public void setIdPengarang(Long idPengarang) {
        this.idPengarang = idPengarang;
    }

    public String getNamaPengarang() {
        return namaPengarang;
    }

    public void setNamaPengarang(String namaPengarang) {
        this.namaPengarang = namaPengarang;
    }
}