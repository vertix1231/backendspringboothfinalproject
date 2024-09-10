package com.juaracoding.pcmspringbootcsr.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "MstPenjualanDetail")
public class PenjualanDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPenjualanDetail")
    private Long idPenjualanDetail;

    @ManyToOne
    @JoinColumn(name = "IDItem")
    private Item item;

    @Column(name = "JumlahBarang", nullable = false)
    private Short jumlahBarang;

    @Column(name = "HargaPerItem", nullable = false)
    private Double hargaPerItem;

    @Column(name = "Diskon",nullable = false)
    private Float persentaseDiskon;

    @Column(name = "NominalDiskon")
    private Double nominalDiskon;

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

    public Long getIdPenjualanDetail() {
        return idPenjualanDetail;
    }

    public void setIdPenjualanDetail(Long idPenjualanDetail) {
        this.idPenjualanDetail = idPenjualanDetail;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
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
