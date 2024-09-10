package com.juaracoding.pcmspringbootcsr.service;

import com.juaracoding.pcmspringbootcsr.configuration.OtherConfig;
import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageDivisi;
import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageGlobal;
import com.juaracoding.pcmspringbootcsr.core.IService;
import com.juaracoding.pcmspringbootcsr.core.security.ModulAuthority;
import com.juaracoding.pcmspringbootcsr.dto.KategoriBukuDTO;
import com.juaracoding.pcmspringbootcsr.dto.SearchParamDTO;
import com.juaracoding.pcmspringbootcsr.handler.ResponseHandler;
import com.juaracoding.pcmspringbootcsr.model.KategoriBuku;
import com.juaracoding.pcmspringbootcsr.repo.KategoriBukuRepo;
import com.juaracoding.pcmspringbootcsr.util.CsvReader;
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
    Modul Code 10
 */

@Service
@Transactional
public class KategoriBukuService implements IService<KategoriBuku> {

    private KategoriBukuRepo kategoriBukuRepo;
    private String[] strExceptionArr = new String[2];
    @Autowired
    private ModelMapper modelMapper;
    private Map<String,Object> objectMapper = new HashMap<String,Object>();
    private TransformToDTO transformToDTO = new TransformToDTO();
    private Map<String,Object> mapToken = new HashMap<String,Object>();
    @Autowired
    private ModulAuthority modulAuthority;
    private List<SearchParamDTO> listSearchParamDTO  = new ArrayList<>();
    @Autowired
    private CsvReader csvReader = new CsvReader();
    private String authorizationCode = "33";//ini disinkron kan dengan id di table MstMenu

    @Autowired
    public KategoriBukuService(KategoriBukuRepo kategoriBukuRepo) {
        strExceptionArr[0]="KategoriBukuService";
        mapColumn();
        this.kategoriBukuRepo = kategoriBukuRepo;
    }

    private void mapColumn()
    {
        //FE CSR
        listSearchParamDTO.add(new SearchParamDTO("id","ID KATEGORI"));
        listSearchParamDTO.add(new SearchParamDTO("nama","NAMA KATEGORI"));
    }

    @Override
    public ResponseEntity<Object> save(KategoriBuku kategoriBuku, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }

        if(kategoriBuku==null)
        {
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.BAD_REQUEST,
                    null,
                    "FV10001", request);
        }
        try {

            kategoriBuku.setCreatedBy(Integer.parseInt(mapToken.get("uid").toString()));
            kategoriBuku.setCreatedDate(new Date());
            kategoriBukuRepo.save(kategoriBuku);
        } catch (Exception e) {
            strExceptionArr[1] = "save(KategoriBuku kategoriBuku, HttpServletRequest request) --- LINE 70";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,
                    "FE10001", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_SAVE,
                HttpStatus.CREATED,
                null,
                null, request);
    }

    @Override
    public ResponseEntity<Object> saveBatch(List<KategoriBuku> lt, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }

        if(lt.size()==0 || lt==null)
        {
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.BAD_REQUEST,
                    null,
                    "FE10011", request);
        }
        Integer intUserId = Integer.parseInt(mapToken.get("uid").toString());
        for(int i=0;i<lt.size();i++)
        {
            lt.get(i).setCreatedBy(intUserId);//input userid di masing2 data yang akan di save
        }

        try {
            kategoriBukuRepo.saveAll(lt);
        } catch (Exception e) {
            strExceptionArr[1] = "saveBatch(List<KategoriBuku> lt, HttpServletRequest request) --- LINE 128";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,
                    "FE10001", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_SAVE,
                HttpStatus.CREATED,
                null,
                null, request);
    }

    @Override
    public ResponseEntity<Object> edit(Long id, KategoriBuku kategoriBuku, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }

        try {
            Optional<KategoriBuku> optionalKategoriBuku = kategoriBukuRepo.findById(id);
            if(optionalKategoriBuku.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageDivisi.WARNING_DIVISI_NOT_EXISTS,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,
                        "FV10021",request);
            }
            KategoriBuku nextKategoriBuku = optionalKategoriBuku.get();
            nextKategoriBuku.setNamaKategoriBuku(kategoriBuku.getNamaKategoriBuku());
            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            nextKategoriBuku.setModifiedBy(Integer.parseInt(mapToken.get("uid").toString()));
            nextKategoriBuku.setModifiedDate(new Date());

        } catch (Exception e) {
            strExceptionArr[1] = " edit(Long id, KategoriBuku kategoriBuku, HttpServletRequest request) --- LINE 140";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,
                    "FE10021", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_UPDATE,
                HttpStatus.OK,
                null,
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
        Optional<KategoriBuku> opKategoriBuku = null;
        KategoriBuku nextKategoriBuku = null;
        try {
            opKategoriBuku = kategoriBukuRepo.findById(id);

            if(opKategoriBuku.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,
                        "FV10031",request);
            }
            nextKategoriBuku = opKategoriBuku.get();
            nextKategoriBuku.setActive(false);
            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            nextKategoriBuku.setModifiedBy(Integer.parseInt(mapToken.get("uid").toString()));
            nextKategoriBuku.setModifiedDate(new Date());
        } catch (Exception e) {
            strExceptionArr[1] = " delete(Long id, HttpServletRequest request) --- LINE 344";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,
                    "FE10031", request);
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
        Optional<KategoriBuku> opKategoriBuku = null;
        try{
            opKategoriBuku = kategoriBukuRepo.findByIsActiveAndIdKategoriBuku(true,id);
            if(opKategoriBuku.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageDivisi.WARNING_DIVISI_NOT_EXISTS,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,
                        "FV10041",request);
            }
        }catch (Exception e)
        {
            strExceptionArr[1] = "findById(Long id, HttpServletRequest request) --- LINE 344";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,
                    "FE10041", request);
        }
        KategoriBuku kategoriBuku = opKategoriBuku.get();
        KategoriBukuDTO kategoriBukuDTO = modelMapper.map(kategoriBuku, new TypeToken<KategoriBukuDTO>() {}.getType());
        return new ResponseHandler().
                generateResponse(ConstantMessageGlobal.SUCCESS_FIND_BY,
                        HttpStatus.OK,
                        kategoriBukuDTO,
                        null,
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
        Page<KategoriBuku> pageKategoriBuku = null;
        List<KategoriBuku> listKategoriBuku = null;
        List<KategoriBukuDTO> listKategoriBukuDTO = null;
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
                        strExceptionArr[1] = "find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request) --- LINE 202";
                        LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
                        return new ResponseHandler().
                                generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                                        HttpStatus.INTERNAL_SERVER_ERROR,
                                        null,//HANDLE NILAI PENCARIAN
                                        "FE10051",
                                        request);
                    }
                }
            }
            /*
                PENGISIAN DATA dan VALIDASI UNTUK PAGING ADA DI METHOD getDataByValue
             */
            pageKategoriBuku = getDataByValue(pageable,columFirst,valueFirst);
            listKategoriBuku = pageKategoriBuku.getContent();
            if(listKategoriBuku.size()==0)
            {
                return new ResponseHandler().
                        generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                                HttpStatus.NOT_FOUND,
                                null,
                                "FV10052",
                                request);
            }
            listKategoriBukuDTO = modelMapper.map(listKategoriBuku, new TypeToken<List<KategoriBukuDTO>>() {}.getType());
            mapResult = transformToDTO.transformObject(objectMapper,listKategoriBukuDTO,pageKategoriBuku);
            mapResult.put("searchParam",listSearchParamDTO);
            mapResult.put("columnFirst",columFirst);
            mapResult.put("valueFirst",valueFirst);
        }
        catch (Exception e)
        {
            strExceptionArr[1] = "find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request) --- LINE 272";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    null,
                    "FE10051", request);
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

    private Page<KategoriBuku> getDataByValue(Pageable pageable, String columnFirst, String valueFirst)
    {
        if(valueFirst.equals("") || valueFirst==null)
        {
            return kategoriBukuRepo.findByIsActive(pageable,true);
        }
        if(columnFirst.equals("id"))
        {
            return kategoriBukuRepo.findByIsActiveAndIdKategoriBuku(pageable,true,Long.parseLong(valueFirst));
        } else if (columnFirst.equals("nama")) {
            return kategoriBukuRepo.findByIsActiveAndNamaKategoriBukuContainsIgnoreCase(pageable,true,valueFirst);
        }

        return kategoriBukuRepo.findByIsActive(pageable,true);// ini default kalau parameter search nya tidak sesuai--- asumsi nya di hit bukan dari web
    }

}
