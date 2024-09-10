package com.juaracoding.pcmspringbootcsr.model;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "MstItem")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDItem")
    private Long idItem;

    @Column(name = "NamaItem", nullable = false,unique = true)
    private String namaItem;

    @Column(name = "Stock",columnDefinition = "int default 0")
    private Integer stock;

    @Column(name = "HargaPerUnit")
    private Double hargaPerUnit;

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
