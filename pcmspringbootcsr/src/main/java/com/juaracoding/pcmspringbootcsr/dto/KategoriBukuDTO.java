package com.juaracoding.pcmspringbootcsr.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class KategoriBukuDTO {

    private Long idKategoriBuku;

    @NotNull
    @NotBlank
    @NotEmpty
    private String namaKategoriBuku;

    public Long getIdKategoriBuku() {
        return idKategoriBuku;
    }

    public void setIdKategoriBuku(Long idKategoriBuku) {
        this.idKategoriBuku = idKategoriBuku;
    }

    public String getNamaKategoriBuku() {
        return namaKategoriBuku;
    }

    public void setNamaKategoriBuku(String namaKategoriBuku) {
        this.namaKategoriBuku = namaKategoriBuku;
    }
}
