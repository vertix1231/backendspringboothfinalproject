package com.juaracoding.pcmspringbootcsr.controller;

import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageGlobal;
import com.juaracoding.pcmspringbootcsr.dto.pengarang.PengarangDTO;
import com.juaracoding.pcmspringbootcsr.handler.ResponseHandler;
import com.juaracoding.pcmspringbootcsr.model.Pengarang;
import com.juaracoding.pcmspringbootcsr.service.PengarangService;
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
public class PengarangController {
    private PengarangService pengarangService;
    @Autowired
    private ModelMapper modelMapper;
    private Map<String,Object> objectMapper = new HashMap<String,Object>();
    private Map<String,String> mapSorting = new HashMap<String,String>();
    private List<Pengarang> lsCPUpload = new ArrayList<Pengarang>();
    private String [] strExceptionArr = new String[2];

    @Autowired
    public PengarangController(PengarangService pengarangService) {
        strExceptionArr[0] = "PengarangController";
        mapSorting();
        this.pengarangService = pengarangService;
    }

    private void mapSorting()
    {
        mapSorting.put("id","idPengarang");
        mapSorting.put("nama","namaPengarang");
        mapSorting.put("alamat","alamat");
    }

    @PostMapping("/pengarang/v1")
    public ResponseEntity<Object> save(@Valid @RequestBody PengarangDTO pengarangDTO
            , HttpServletRequest request
    )
    {
        Pengarang pengarang = modelMapper.map(pengarangDTO, new TypeToken<Pengarang>() {}.getType());
        return pengarangService.save(pengarang,request);
    }
    @PostMapping("/pengarang/v1/batch")
    public ResponseEntity<Object> saveBatch(@RequestBody List<PengarangDTO>  listPengarangDTO
            , HttpServletRequest request
    )
    {
        List<Pengarang> listPengarang = modelMapper.map(listPengarangDTO, new TypeToken<List<Pengarang>>() {}.getType());
        return pengarangService.saveBatch(listPengarang,request);
    }

    @PutMapping("/pengarang/v1/{id}")
    public ResponseEntity<Object> edit(@Valid @RequestBody PengarangDTO pengarangDTO,
                                     @PathVariable("id") Long id,
                                     HttpServletRequest request
    )
    {
        Pengarang pengarang = modelMapper.map(pengarangDTO, new TypeToken<Pengarang>() {}.getType());
        return pengarangService.edit(id,pengarang,request);
    }

    @GetMapping("/pengarang/v1/{id}")
    public ResponseEntity<Object> findById(HttpServletRequest request, @PathVariable("id") Long id)
    {
        return pengarangService.findById(id,request);
    }

    @GetMapping("/pengarang/v1")
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
            return pengarangService.find(pageable,columnFirst,valueFirst,request);
        }
        /*
            jika tidak ada data maka ada notifikasi tidak tersedia di response nya
         */
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_NOT_AVAILABLE,
                HttpStatus.BAD_REQUEST,
                null,
                "Not Available", request);
    }

    @DeleteMapping("/pengarang/v1/{id}")
    public ResponseEntity<Object> delete(HttpServletRequest request, @PathVariable("id") Long id)
    {
        return pengarangService.delete(id,request);
    }

    @PostMapping("/pengarang/v1/uploaddata")
    public ResponseEntity<Object> export(@RequestParam("datapengarang")
                                        @RequestHeader MultipartFile file,
                                        HttpServletRequest request)
    {
        return pengarangService.dataToExport(file,request);//untuk data BULK
    }
}