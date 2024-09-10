package com.juaracoding.pcmspringbootcsr.dto;

import java.time.LocalDate;
import java.util.Date;

public class UserDTO {
    private Long idUser;

    private AksesDTO akses;

    private String email;
    private String username;

    private String password;
    private String namaLengkap;

    private String token;

    private Integer tokenCounter=0;

    private Integer passwordCounter=0;

    private Date lastLoginDate;
    private Integer umur;

    private LocalDate tanggalLahir;

    private String noHP;

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public AksesDTO getAkses() {
        return akses;
    }

    public void setAkses(AksesDTO akses) {
        this.akses = akses;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNamaLengkap() {
        return namaLengkap;
    }

    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getTokenCounter() {
        return tokenCounter;
    }

    public void setTokenCounter(Integer tokenCounter) {
        this.tokenCounter = tokenCounter;
    }

    public Integer getPasswordCounter() {
        return passwordCounter;
    }

    public void setPasswordCounter(Integer passwordCounter) {
        this.passwordCounter = passwordCounter;
    }

    public Date getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public Integer getUmur() {
        return umur;
    }

    public void setUmur(Integer umur) {
        this.umur = umur;
    }

    public LocalDate getTanggalLahir() {
        return tanggalLahir;
    }

    public void setTanggalLahir(LocalDate tanggalLahir) {
        this.tanggalLahir = tanggalLahir;
    }

    public String getNoHP() {
        return noHP;
    }

    public void setNoHP(String noHP) {
        this.noHP = noHP;
    }
}
