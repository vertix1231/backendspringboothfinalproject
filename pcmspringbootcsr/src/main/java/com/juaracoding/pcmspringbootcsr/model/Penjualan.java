package com.juaracoding.pcmspringbootcsr.model;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "MstPenjualan")
public class Penjualan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPenjualan")
    private Long idPenjualan;

    @Column(name = "Struk", unique = true,nullable = false ,columnDefinition = "Char(15)")
    private String struk;

    @Column(name = "TotalPembelian")
    private Double totalPembelian;

    @Column(name = "TotalItem",nullable = false,columnDefinition = "tinyint")
    private Short totalItem;

    @Column(name = "TotalDiskon" , nullable = false)
    private Float totalDiscount;

    /*
        start audit trails
     */
    @Column(name ="CreatedDate" , nullable = false)
    private Date createdDate = new Date();

    @Column(name = "CreatedBy", nullable = false)
    private Integer createdBy=1;

    @Column(name = "ModifiedDate")
    private Date modifiedDate;
    @Column(name = "ModifiedBy")
    private Integer modifiedBy;

    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;
    /*
        end audit trails
     */

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

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Integer getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(Integer modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
