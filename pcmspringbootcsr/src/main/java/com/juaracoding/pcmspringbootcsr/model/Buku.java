package com.juaracoding.pcmspringbootcsr.model;


import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "MstBuku")
public class Buku {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDBuku")
    private Long idBuku;

    @Column(name = "Judul")
    private String judulBuku;

    @Column(name = "Tahun")
    private Short tahunTerbit;

    @ManyToOne
    @JoinColumn(name = "IDKategoriBuku")
    private KategoriBuku kategoriBuku;

    @ManyToMany
    @JoinTable(name = "MapPengarangBuku",
            joinColumns = {
                    @JoinColumn(name = "IDBuku",referencedColumnName = "IDBuku")}, inverseJoinColumns = {
            @JoinColumn (name = "IDPengarang",referencedColumnName = "IDPengarang")}, uniqueConstraints = @UniqueConstraint(columnNames = {
            "IDBuku", "IDPengarang" }))
    private List<Pengarang> listPengarang;

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

    public List<Pengarang> getListPengarang() {
        return listPengarang;
    }

    public void setListPengarang(List<Pengarang> listPengarang) {
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

    public KategoriBuku getKategoriBuku() {
        return kategoriBuku;
    }

    public void setKategoriBuku(KategoriBuku kategoriBuku) {
        this.kategoriBuku = kategoriBuku;
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
