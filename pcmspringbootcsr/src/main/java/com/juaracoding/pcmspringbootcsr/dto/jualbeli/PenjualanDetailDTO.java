package com.juaracoding.pcmspringbootcsr.dto.jualbeli;

public class PenjualanDetailDTO {

    private Long idPenjualanDetail;
    private ItemDTO item;
    private Short jumlahBarang;
    private Double hargaPerItem;
    private Float persentaseDiskon;
    private Double nominalDiskon;

    public Long getIdPenjualanDetail() {
        return idPenjualanDetail;
    }

    public void setIdPenjualanDetail(Long idPenjualanDetail) {
        this.idPenjualanDetail = idPenjualanDetail;
    }

    public ItemDTO getItem() {
        return item;
    }

    public void setItem(ItemDTO item) {
        this.item = item;
    }

    public Short getJumlahBarang() {
        return jumlahBarang;
    }

    public void setJumlahBarang(Short jumlahBarang) {
        this.jumlahBarang = jumlahBarang;
    }

    public Double getHargaPerItem() {
        return hargaPerItem;
    }

    public void setHargaPerItem(Double hargaPerItem) {
        this.hargaPerItem = hargaPerItem;
    }

    public Float getPersentaseDiskon() {
        return persentaseDiskon;
    }

    public void setPersentaseDiskon(Float persentaseDiskon) {
        this.persentaseDiskon = persentaseDiskon;
    }

    public Double getNominalDiskon() {
        return nominalDiskon;
    }

    public void setNominalDiskon(Double nominalDiskon) {
        this.nominalDiskon = nominalDiskon;
    }
}
