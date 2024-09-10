package com.juaracoding.pcmspringbootcsr.controller;


import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageGlobal;
import com.juaracoding.pcmspringbootcsr.dto.jualbeli.ItemDTO;
import com.juaracoding.pcmspringbootcsr.handler.ResponseHandler;
import com.juaracoding.pcmspringbootcsr.model.Item;
import com.juaracoding.pcmspringbootcsr.service.ItemService;
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
@RequestMapping("/api/jualbeli")
public class ItemController {

    private ItemService itemService;
    @Autowired
    private ModelMapper modelMapper;
    private Map<String,Object> objectMapper = new HashMap<String,Object>();
    private Map<String,String> mapSorting = new HashMap<String,String>();
    private List<Item> lsCPUpload = new ArrayList<Item>();
    private String [] strExceptionArr = new String[2];

    @Autowired
    public ItemController(ItemService itemService) {
        strExceptionArr[0] = "ItemController";
        mapSorting();
        this.itemService = itemService;
    }

    private void mapSorting()
    {
        mapSorting.put("id","idItem");
        mapSorting.put("nama","namaItem");
    }

    @PostMapping("/item/v1")
    public ResponseEntity<Object> save(@Valid @RequestBody ItemDTO itemDTO
            , HttpServletRequest request
    )
    {
        Item item = modelMapper.map(itemDTO, new TypeToken<Item>() {}.getType());
        return itemService.save(item,request);
    }
    @PostMapping("/item/v1/batch")
    public ResponseEntity<Object> saveBatch(@RequestBody List<ItemDTO>  listItemDTO
            , HttpServletRequest request
    )
    {
        List<Item> listItem = modelMapper.map(listItemDTO, new TypeToken<List<Item>>() {}.getType());
        return itemService.saveBatch(listItem,request);
    }

    @PutMapping("/item/v1/{id}")
    public ResponseEntity<Object> edit(@Valid @RequestBody ItemDTO itemDTO,
                                       @PathVariable("id") Long id,
                                       HttpServletRequest request
    )
    {
        Item item = modelMapper.map(itemDTO, new TypeToken<Item>() {}.getType());
        return itemService.edit(id,item,request);
    }

    @GetMapping("/item/v1/{id}")
    public ResponseEntity<Object> findById(HttpServletRequest request, @PathVariable("id") Long id)
    {
        return itemService.findById(id,request);
    }

    @GetMapping("/item/v1")
    public ResponseEntity<Object> find(
            @RequestParam(value = "page") Integer pagez,
            @RequestParam(value = "sort") String sortz,
            @RequestParam(value = "sortby") String sortzBy,
            @RequestParam(value = "columnFirst") String columnFirst,
            @RequestParam(value = "valueFirst") String valueFirst,
            @RequestParam(value = "sizeComponent") String sizeComponent,
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
            return itemService.find(pageable,columnFirst,valueFirst,request);
        }
        /*
            jika tidak ada data maka ada notifikasi tidak tersedia di response nya
         */
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_NOT_AVAILABLE,
                HttpStatus.BAD_REQUEST,
                null,
                "Not Available", request);
    }

    @DeleteMapping("/item/v1/{id}")
    public ResponseEntity<Object> delete(HttpServletRequest request, @PathVariable("id") Long id)
    {
        return itemService.delete(id,request);
    }

    @PostMapping("/item/v1/uploaddata")
    public ResponseEntity<Object> export(@RequestParam("dataitem")
                                         @RequestHeader MultipartFile file,
                                         HttpServletRequest request)
    {
        return itemService.dataToExport(file,request);//untuk data BULK
    }

}
