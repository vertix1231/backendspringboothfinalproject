package com.juaracoding.pcmspringbootcsr.controller;

import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageGlobal;
import com.juaracoding.pcmspringbootcsr.dto.buku.BukuDTO;
import com.juaracoding.pcmspringbootcsr.handler.ResponseHandler;
import com.juaracoding.pcmspringbootcsr.model.Buku;
import com.juaracoding.pcmspringbootcsr.service.BukuService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
    code number authorization 13 ==> xyt
 */
@RestController
@RequestMapping("/api/book")
public class BukuController {

    private BukuService bukuService;
    @Autowired
    private ModelMapper modelMapper;
    private Map<String,Object> objectMapper = new HashMap<String,Object>();
    private Map<String,String> mapSorting = new HashMap<String,String>();
    private String [] strExceptionArr = new String[2];
    private String strAuthorization = "";
    private Map<String,Object> mapToken = new HashMap<String,Object>();

    @Autowired
    public BukuController(BukuService bukuService) {
        strExceptionArr [0] = "BukuController";
        mapSorting();
        this.bukuService = bukuService;
    }
    private void mapSorting()
    {
        mapSorting.put("id","idBuku");
        mapSorting.put("judul","judulBuku");
        mapSorting.put("tahun","tahunTerbit");
        mapSorting.put("kategori","namaKategoriBuku");
    }

    @PostMapping("/buku/v1")
    public ResponseEntity<Object> save(@Valid @RequestBody BukuDTO bukuDTO
            , HttpServletRequest request
    )
    {
        Buku buku = modelMapper.map(bukuDTO, new TypeToken<Buku>() {}.getType());
        return bukuService.save(buku,request);
    }
    @PostMapping("/buku/v1/batch")
    public ResponseEntity<Object> saveBatch(@RequestBody List<BukuDTO>  listBukuDTO
            , HttpServletRequest request
    )
    {
        List<Buku> listBuku = modelMapper.map(listBukuDTO, new TypeToken<List<Buku>>() {}.getType());
        return bukuService.saveBatch(listBuku,request);
    }

    @PutMapping("/buku/v1/{id}")
    public ResponseEntity<Object> edit(@Valid @RequestBody BukuDTO bukuDTO,
                                       @PathVariable("id") Long id,
                                       HttpServletRequest request
    )
    {
        Buku buku = modelMapper.map(bukuDTO, new TypeToken<Buku>() {}.getType());
        return bukuService.edit(id,buku,request);
    }

    @GetMapping("/buku/v1/{id}")
    public ResponseEntity<Object> findById(HttpServletRequest request, @PathVariable("id") Long id)
    {
        return bukuService.findById(id,request);
    }

    @GetMapping("/buku/v1")
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
        sortzBy = (sortzBy==null || sortzBy.equals(""))?"id":sortzBy;
        sortz = (sortz.equals("") || sortz==null)? "asc" : sortzBy;

        if(!(pagez==null && sizeComponent==null)){
            sortzBy = mapSorting.get(sortzBy);
            Pageable pageable = PageRequest.of(pagez,Integer.parseInt(sizeComponent.equals("")?"10":sizeComponent),
                    sortz.equals("desc")? Sort.by(sortzBy).descending():Sort.by(sortzBy));
            return bukuService.find(pageable,columnFirst,valueFirst,request);
        }

        return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_NOT_AVAILABLE,
                HttpStatus.BAD_REQUEST,
                null,
                "Not Available", request);
    }

    @DeleteMapping("/buku/v1/{id}")
    public ResponseEntity<Object> delete(HttpServletRequest request, @PathVariable("id") Long id)
    {
        return bukuService.delete(id,request);
    }

    /*
        upload data tidak ada di modul ini
     */
}
