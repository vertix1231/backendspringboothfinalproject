package com.juaracoding.pcmspringbootcsr.dto.jualbeli;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class ItemDTO {
    private Long idItem;
    @NotNull
    @NotEmpty
    @NotBlank
    private String namaItem;

    @NotNull
    private Integer stock;

    @NotNull
    private Double hargaPerUnit;

    public Long getIdItem() {
        return idItem;
    }

    public void setIdItem(Long idItem) {
        this.idItem = idItem;
    }

    public String getNamaItem() {
        return namaItem;
    }

    public void setNamaItem(String namaItem) {
        this.namaItem = namaItem;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Double getHargaPerUnit() {
        return hargaPerUnit;
    }

    public void setHargaPerUnit(Double hargaPerUnit) {
        this.hargaPerUnit = hargaPerUnit;
    }
}
