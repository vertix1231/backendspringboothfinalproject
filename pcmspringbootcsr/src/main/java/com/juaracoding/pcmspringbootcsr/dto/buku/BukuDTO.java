package com.juaracoding.pcmspringbootcsr.dto.buku;

import com.juaracoding.pcmspringbootcsr.dto.KategoriBukuDTO;
import com.juaracoding.pcmspringbootcsr.dto.pengarang.PengarangOptionDTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public class BukuDTO {
    private Long idBuku;

    @NotNull
    @NotEmpty
    @NotBlank
    private String judulBuku;

    @NotNull
    private Short tahunTerbit;

    @NotNull
    private KategoriBukuDTO kategoriBuku;
    private List<PengarangOptionDTO> listPengarang;

    public List<PengarangOptionDTO> getListPengarang() {
        return listPengarang;
    }

    public void setListPengarang(List<PengarangOptionDTO> listPengarang) {
        this.listPengarang = listPengarang;
    }

    public Long getIdBuku() {
        return idBuku;
    }

    public void setIdBuku(Long idBuku) {
        this.idBuku = idBuku;
    }

    public String getJudulBuku() {
        return judulBuku;
    }

    public void setJudulBuku(String judulBuku) {
        this.judulBuku = judulBuku;
    }

    public Short getTahunTerbit() {
        return tahunTerbit;
    }

    public void setTahunTerbit(Short tahunTerbit) {
        this.tahunTerbit = tahunTerbit;
    }

    public KategoriBukuDTO getKategoriBuku() {
        return kategoriBuku;
    }

    public void setKategoriBuku(KategoriBukuDTO kategoriBuku) {
        this.kategoriBuku = kategoriBuku;
    }
}
