package com.juaracoding.pcmspringbootcsr.controller;


import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageGlobal;
import com.juaracoding.pcmspringbootcsr.dto.KategoriBukuDTO;
import com.juaracoding.pcmspringbootcsr.handler.ResponseHandler;
import com.juaracoding.pcmspringbootcsr.model.KategoriBuku;
import com.juaracoding.pcmspringbootcsr.service.KategoriBukuService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
public class KategoriBukuController {

    private KategoriBukuService kategoriBukuService;
    @Autowired
    private ModelMapper modelMapper;
    private Map<String,Object> objectMapper = new HashMap<String,Object>();
    private Map<String,String> mapSorting = new HashMap<String,String>();
    private List<KategoriBuku> lsCPUpload = new ArrayList<KategoriBuku>();
    private String [] strExceptionArr = new String[2];

    @Autowired
    public KategoriBukuController(KategoriBukuService kategoriBukuService) {
        strExceptionArr[0] = "KategoriBukuController";
        mapSorting();
        this.kategoriBukuService = kategoriBukuService;
    }

    private void mapSorting()
    {
        mapSorting.put("id","idKategoriBuku");
        mapSorting.put("nama","namaKategoriBuku");
    }

    @PostMapping("/katbuku/v1")
    public ResponseEntity<Object> save(@Valid @RequestBody KategoriBukuDTO kategoriBukuDTO
            , HttpServletRequest request
    )
    {
        KategoriBuku kategoriBuku = modelMapper.map(kategoriBukuDTO, new TypeToken<KategoriBuku>() {}.getType());
        return kategoriBukuService.save(kategoriBuku,request);
    }
    @PostMapping("/katbuku/v1/batch")
    public ResponseEntity<Object> saveBatch(@RequestBody List<KategoriBukuDTO>  listKategoriBukuDTO
            , HttpServletRequest request
    )
    {
        List<KategoriBuku> listKategoriBuku = modelMapper.map(listKategoriBukuDTO, new TypeToken<List<KategoriBuku>>() {}.getType());
        return kategoriBukuService.saveBatch(listKategoriBuku,request);
    }

    @PutMapping("/katbuku/v1/{id}")
    public ResponseEntity<Object> edit(@Valid @RequestBody KategoriBukuDTO kategoriBukuDTO,
                                       @PathVariable("id") Long id,
                                       HttpServletRequest request
    )
    {
        KategoriBuku kategoriBuku = modelMapper.map(kategoriBukuDTO, new TypeToken<KategoriBuku>() {}.getType());
        return kategoriBukuService.edit(id,kategoriBuku,request);
    }

    @GetMapping("/katbuku/v1/{id}")
    public ResponseEntity<Object> findById(HttpServletRequest request, @PathVariable("id") Long id)
    {
        return kategoriBukuService.findById(id,request);
    }

    @GetMapping("/katbuku/v1")
    public ResponseEntity<Object> find(
            @RequestParam(value = "page") Integer pagez,
            @RequestParam(value = "sort") String sortz,//default nya pasti asc
            @RequestParam(value = "sortby") String sortzBy,//id, nama, deskripsi, kode
            @RequestParam(value = "columnFirst") String columnFirst,
            @RequestParam(value = "valueFirst") String valueFirst,
            @RequestParam(value = "sizeComponent") String sizeComponent,// jumlah data per page
            HttpServletRequest request
    ){
        Pageable page = null;
        pagez = pagez==null?0:pagez;
        sortzBy = (sortzBy==null || sortzBy.equals(""))?"id":sortzBy;//penanda kalau null dari FE itu berarti kayak buka menu baru
        sortz = (sortz.equals("") || sortz==null)? "asc" : sortzBy;

        if(!(pagez==null && sizeComponent==null)){
            sortzBy = mapSorting.get(sortzBy);
            Pageable pageable = PageRequest.of(pagez,Integer.parseInt(sizeComponent.equals("")?"10":sizeComponent),
                    sortz.equals("desc")? Sort.by(sortzBy).descending():Sort.by(sortzBy));
            return kategoriBukuService.find(pageable,columnFirst,valueFirst,request);
        }
        /*
            jika tidak ada data maka ada notifikasi tidak tersedia di response nya
         */
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_NOT_AVAILABLE,
                HttpStatus.BAD_REQUEST,
                null,
                "Not Available", request);
    }

    @DeleteMapping("/katbuku/v1/{id}")
    public ResponseEntity<Object> delete(HttpServletRequest request, @PathVariable("id") Long id)
    {
        return kategoriBukuService.delete(id,request);
    }
    @PostMapping("/katbuku/v1/uploaddata")
    public ResponseEntity<Object> export(@RequestParam("datadivisi")
                                         @RequestHeader MultipartFile file,
                                         HttpServletRequest request)
    {
//        return kategoriBukuService.dataToExport(file,request);//untuk data BULK
        return null;
    }
}