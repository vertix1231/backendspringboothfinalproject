package com.juaracoding.pcmspringbootcsr.dto.jualbeli;
public class PenjualanDTO {
    private Long idPenjualan;
    private String struk;
    private Double totalPembelian;
    private Short totalItem;
    private Float totalDiscount;
    public Long getIdPenjualan() {
        return idPenjualan;
    }
    public void setIdPenjualan(Long idPenjualan) {
        this.idPenjualan = idPenjualan;
    }

    public String getStruk() {
        return struk;
    }

    public void setStruk(String struk) {
        this.struk = struk;
    }

    public Double getTotalPembelian() {
        return totalPembelian;
    }

    public void setTotalPembelian(Double totalPembelian) {
        this.totalPembelian = totalPembelian;
    }

    public Short getTotalItem() {
        return totalItem;
    }

    public void setTotalItem(Short totalItem) {
        this.totalItem = totalItem;
    }

    public Float getTotalDiscount() {
        return totalDiscount;
    }

    public void setTotalDiscount(Float totalDiscount) {
        this.totalDiscount = totalDiscount;
    }
}
