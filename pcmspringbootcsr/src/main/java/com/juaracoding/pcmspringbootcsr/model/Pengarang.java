package com.juaracoding.pcmspringbootcsr.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "MstPengarang")
public class Pengarang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPengarang")
    private Long idPengarang;

    private String namaPengarang;
    private String alamat;

    @ManyToMany(mappedBy = "listPengarang")
    private List<Buku> listBuku;

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

    public List<Buku> getListBuku() {
        return listBuku;
    }

    public void setListBuku(List<Buku> listBuku) {
        this.listBuku = listBuku;
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
