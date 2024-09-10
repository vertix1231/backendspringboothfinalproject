package com.juaracoding.pcmspringbootcsr.service;

import com.juaracoding.pcmspringbootcsr.configuration.OtherConfig;
import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageGlobal;
import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageItem;
import com.juaracoding.pcmspringbootcsr.core.IService;
import com.juaracoding.pcmspringbootcsr.core.security.ModulAuthority;
import com.juaracoding.pcmspringbootcsr.dto.SearchParamDTO;
import com.juaracoding.pcmspringbootcsr.dto.divisi.DivisiOptionDTO;
import com.juaracoding.pcmspringbootcsr.dto.jualbeli.ItemDTO;
import com.juaracoding.pcmspringbootcsr.dto.menu.MenuOptionDTO;
import com.juaracoding.pcmspringbootcsr.handler.ResponseHandler;
import com.juaracoding.pcmspringbootcsr.model.Item;
import com.juaracoding.pcmspringbootcsr.repo.ItemRepo;
import com.juaracoding.pcmspringbootcsr.util.LoggingFile;
import com.juaracoding.pcmspringbootcsr.util.TransformToDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.*;


/*
    Modul Code = 06
 */
@Service
@Transactional
public class ItemService implements IService<Item> {

    private ItemRepo itemRepo;
    private String[] strExceptionArr = new String[2];
    @Autowired
    private ModelMapper modelMapper;
    private Map<String,Object> objectMapper = new HashMap<String,Object>();
    private TransformToDTO transformToDTO = new TransformToDTO();
    private List<SearchParamDTO> listSearchParamDTO  = new ArrayList<>();
    private Map<String,Object> mapToken = new HashMap<String,Object>();
    private List<DivisiOptionDTO> ltDivisiOptDTO = null;
    private List<MenuOptionDTO> ltMenuOptDTO = null;
    private String authorizationCode = "31";

    @Autowired
    private ModulAuthority modulAuthority;

    private Map<String,Object> mapComponent = new HashMap<String,Object>();

    @Autowired
    public ItemService(ItemRepo itemRepo) {
        strExceptionArr[0]="ItemService";
        mapColumn();
        this.itemRepo = itemRepo;
    }

    private void mapColumn()
    {
        listSearchParamDTO.add(new SearchParamDTO("id","ID"));
        listSearchParamDTO.add(new SearchParamDTO("nama","NAMA"));
    }

    @Override
    public ResponseEntity<Object> save(Item item, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        if(item==null)
        {
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FV06001", request);//FAILED VALIDATION
        }
        try {

            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            item.setCreatedBy(Integer.parseInt(mapToken.get("uid").toString()));
            item.setCreatedDate(new Date());
            itemRepo.save(item);
        } catch (Exception e) {
            strExceptionArr[1] = "save(Item item, HttpServletRequest request) --- LINE 92";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE06001", request);//FAILED ERROR
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_SAVE,
                HttpStatus.CREATED,
                null,
                null, request);
    }

    @Override
    public ResponseEntity<Object> saveBatch(List<Item> lt, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        if(lt.size()==0 || lt==null)
        {
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FV06011", request);
        }
        mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
        Integer intUserId = Integer.parseInt(mapToken.get("uid").toString());
        for(int i=0;i<lt.size();i++)
        {
            lt.get(i).setCreatedBy(intUserId);//input userid di masing2 data yang akan di save
            lt.get(i).setCreatedDate(new Date());//input userid di masing2 data yang akan di save
        }
        try {
            itemRepo.saveAll(lt);
        } catch (Exception e) {
            strExceptionArr[1] = "saveBatch(List<Item> lt, HttpServletRequest request)  --- LINE 131";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE06011", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_SAVE,
                HttpStatus.CREATED,
                null,//perubahan 21-12-2023
                null, request);
    }

    @Override
    public ResponseEntity<Object> edit(Long id, Item item, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        try {
            Optional<Item> optionalItem = itemRepo.findByIsActiveAndIdItem(true,id);
            if(optionalItem.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageItem.WARNING_ITEM_NOT_EXISTS,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,//perubahan 21-12-2023
                        "FV06021",request);
            }
            Item nextItem = optionalItem.get();
            nextItem.setNamaItem(item.getNamaItem());
            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            nextItem.setModifiedBy(Integer.parseInt(mapToken.get("uid").toString()));
            nextItem.setModifiedDate(new Date());

        } catch (Exception e) {
            strExceptionArr[1] = " edit(Long id, Item item, HttpServletRequest request) --- LINE 173";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE06021", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_UPDATE,
                HttpStatus.OK,
                null,//perubahan 21-12-2023
                null, request);
    }

    @Override
    public ResponseEntity<Object> delete(Long id, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        Optional<Item> optionalItem = null;
        Item nextItem = null;
        try {
            optionalItem = itemRepo.findByIsActiveAndIdItem(true,id);
            if(optionalItem.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,//perubahan 21-12-2023
                        "FV06031",request);
            }
            nextItem = optionalItem.get();
            nextItem.setActive(false);
            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            nextItem.setModifiedBy(Integer.parseInt(mapToken.get("uid").toString()));
            nextItem.setModifiedDate(new Date());

        } catch (Exception e) {
            strExceptionArr[1] = " delete(Long id, HttpServletRequest request)  --- LINE 174";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE06031", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_DELETE,
                HttpStatus.OK,
                null,
                null, request);
    }

    @Override
    public ResponseEntity<Object> findById(Long id, HttpServletRequest request)
    {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        Optional<Item> optionalItem = null;
        try{
            optionalItem = itemRepo.findByIsActiveAndIdItem(true,id);
            if(optionalItem.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageItem.WARNING_ITEM_NOT_EXISTS,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,//perubahan 21-12-2023
                        "FV06041",request);
            }
        }catch (Exception e)
        {
            strExceptionArr[1] = "findById(Long id, HttpServletRequest request) --- LINE 344";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE06041", request);
        }
        Item nextItem = optionalItem.get();
        ItemDTO itemDTO = modelMapper.map(nextItem, new TypeToken<ItemDTO>() {}.getType());
        return new ResponseHandler().
                generateResponse(ConstantMessageGlobal.SUCCESS_FIND_BY,
                        HttpStatus.OK,
                        itemDTO,
                        null,//perubahan 21-12-2023
                        request);
    }

    @Override
    public ResponseEntity<Object> find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        Page<Item> pageItem = null;
        List<Item> listItem = null;
        List<ItemDTO> listItemDTO = null;
        Map<String,Object> mapResult = null;
        try
        {
            /*
                SET DEFAULT PENCARIAN UNTUK MENCEGAH ERROR JIKA PARAMETER COLUMN TIDAK DIISI ATAU NULL
             */
            if(columFirst.equals("id"))
            {
                if(!valueFirst.equals("") && valueFirst!=null)
                {
                    try
                    {
                        /*
                            UNTUK ID YANG BER TIPE NUMERIC
                            TIDAK PERLU DIGUNAKAN JIKA ID BER TIPE STRING
                         */
                        Long.parseLong(valueFirst);
                    }
                    catch (Exception e)
                    {
                        strExceptionArr[1] = "find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request) --- LINE 252";
                        LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
                        return new ResponseHandler().
                                generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                                        HttpStatus.INTERNAL_SERVER_ERROR,
                                        null,//perubahan 21-12-2023
                                        "FE06051",
                                        request);
                    }
                }
            }
            /*
                PENGISIAN DATA dan VALIDASI UNTUK PAGING ADA DI METHOD getDataByValue
             */
            pageItem = getDataByValue(pageable,columFirst,valueFirst);
            listItem = pageItem.getContent();
            if(listItem.size()==0)
            {
                return new ResponseHandler().
                        generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                                HttpStatus.NOT_FOUND,
                                null,
                                "FV06052",
                                request);
            }
            listItemDTO = modelMapper.map(listItem, new TypeToken<List<ItemDTO>>() {}.getType());
            mapResult = transformToDTO.transformObject(objectMapper,listItemDTO,pageItem,listSearchParamDTO,columFirst,valueFirst,ltDivisiOptDTO,ltMenuOptDTO);
        }

        catch (Exception e)
        {
            strExceptionArr[1] = "find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request) --- LINE 325";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    null,
                    "FE06051", request);
        }
        return new ResponseHandler().
                generateResponse(ConstantMessageGlobal.SUCCESS_FIND_BY,
                        HttpStatus.OK,
                        mapResult,
                        null,
                        request);
    }

    @Override
    public ResponseEntity<Object> dataToExport(MultipartFile multipartFile, HttpServletRequest request) {
        return null;
    }

    private Page<Item> getDataByValue(Pageable pageable, String columnFirst, String valueFirst)
    {
        if(valueFirst.equals("") || valueFirst==null)
        {
            return itemRepo.findByIsActive(pageable,true);
        }
        if(columnFirst.equals("id"))
        {
            return itemRepo.findByIsActiveAndIdItem(pageable,true,Long.parseLong(valueFirst));
        } else if (columnFirst.equals("nama")) {
            return itemRepo.findByIsActiveAndNamaItemContainsIgnoreCase(pageable,true,valueFirst);
        }

        return itemRepo.findByIsActive(pageable,true);// ini default kalau parameter search nya tidak sesuai--- asumsi nya di hit bukan dari web
    }

}
