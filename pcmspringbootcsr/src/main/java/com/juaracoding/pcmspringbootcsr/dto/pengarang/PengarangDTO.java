package com.juaracoding.pcmspringbootcsr.dto.pengarang;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.juaracoding.pcmspringbootcsr.dto.buku.BukuDTO;

import java.util.List;

public class PengarangDTO {
    private Long idPengarang;

    private String namaPengarang;
    private String alamat;

    @JsonBackReference
    private List<BukuDTO> listBuku;

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

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public List<BukuDTO> getListBuku() {
        return listBuku;
    }

    public void setListBuku(List<BukuDTO> listBuku) {
        this.listBuku = listBuku;
    }
}