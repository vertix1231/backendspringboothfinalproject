package com.juaracoding.pcmspringbootcsr.service;

import com.juaracoding.pcmspringbootcsr.configuration.OtherConfig;
import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageAkses;
import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageGlobal;
import com.juaracoding.pcmspringbootcsr.core.IService;
import com.juaracoding.pcmspringbootcsr.core.security.ModulAuthority;
import com.juaracoding.pcmspringbootcsr.dto.pengarang.PengarangDTO;
import com.juaracoding.pcmspringbootcsr.dto.SearchParamDTO;
import com.juaracoding.pcmspringbootcsr.handler.ResponseHandler;
import com.juaracoding.pcmspringbootcsr.model.Pengarang;
import com.juaracoding.pcmspringbootcsr.repo.PengarangRepo;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


/*
    Modul Code = 12
 */
@Service
@Transactional
public class PengarangService implements IService<Pengarang> {
    private PengarangRepo pengarangRepo;
    private String[] strExceptionArr = new String[2];
    @Autowired
    private ModelMapper modelMapper;
    private Map<String,Object> objectMapper = new HashMap<String,Object>();
    private TransformToDTO transformToDTO = new TransformToDTO();
    private List<SearchParamDTO> listSearchParamDTO  = new ArrayList<>();
    private Map<String,Object> mapToken = new HashMap<String,Object>();
    private String authorizationCode = "36";

    @Autowired
    private ModulAuthority modulAuthority;
    @Autowired
    public PengarangService(PengarangRepo pengarangRepo) {
        strExceptionArr[0]="PengarangService";
        mapColumn();
        this.pengarangRepo = pengarangRepo;
    }

    private void mapColumn()
    {
        listSearchParamDTO.add(new SearchParamDTO("id","ID"));
        listSearchParamDTO.add(new SearchParamDTO("nama","NAMA"));
        listSearchParamDTO.add(new SearchParamDTO("alamat","ALAMAT"));
    }

    @Override
    public ResponseEntity<Object> save(Pengarang pengarang, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        if(pengarang==null)
        {
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FV12001", request);//FAILED VALIDATION
        }
        try {

            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            pengarang.setCreatedBy(Integer.parseInt(mapToken.get("uid").toString()));
            pengarang.setCreatedDate(new Date());
            pengarangRepo.save(pengarang);
        } catch (Exception e) {
            strExceptionArr[1] = "save(Pengarang pengarang, HttpServletRequest request) --- LINE 82";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE12001", request);//FAILED ERROR
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_SAVE,
                HttpStatus.CREATED,
                null,
                null, request);
    }

    @Override
    public ResponseEntity<Object> saveBatch(List<Pengarang> lt, HttpServletRequest request) {
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
                    "FV12011", request);
        }
        mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
        Integer intUserId = Integer.parseInt(mapToken.get("uid").toString());
        for(int i=0;i<lt.size();i++)
        {
            lt.get(i).setCreatedBy(intUserId);//input userid di masing2 data yang akan di save
            lt.get(i).setCreatedDate(new Date());//input userid di masing2 data yang akan di save
        }
        try {
            pengarangRepo.saveAll(lt);
        } catch (Exception e) {
            strExceptionArr[1] = "saveBatch(List<Akses> lt, HttpServletRequest request) --- LINE 115";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE12011", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_SAVE,
                HttpStatus.CREATED,
                null,//perubahan 21-12-2023
                null, request);
    }

    @Override
    public ResponseEntity<Object> edit(Long id, Pengarang pengarang, HttpServletRequest request) {
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        try {
            Optional<Pengarang> optionalPengarang = pengarangRepo.findByIsActiveAndIdPengarang(true,id);
            if(optionalPengarang.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageAkses.WARNING_AKSES_NOT_EXISTS,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,//perubahan 21-12-2023
                        "FV12021",request);
            }
            Pengarang nextPengarang = optionalPengarang.get();
            nextPengarang.setNamaPengarang(pengarang.getNamaPengarang());
            nextPengarang.setAlamat(pengarang.getAlamat());
            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            nextPengarang.setModifiedBy(Integer.parseInt(mapToken.get("uid").toString()));
            nextPengarang.setModifiedDate(new Date());

        } catch (Exception e) {
            strExceptionArr[1] = " editedit(Long id, Pengarang pengarang, HttpServletRequest request) --- LINE 141";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE12021", request);
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
        Optional<Pengarang> optionalPengarang = null;
        Pengarang nextPengarang = null;
        try {
            optionalPengarang = pengarangRepo.findByIsActiveAndIdPengarang(true,id);
            if(optionalPengarang.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,//perubahan 21-12-2023
                        "FV12031",request);
            }
            nextPengarang = optionalPengarang.get();
            nextPengarang.setActive(false);
            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            nextPengarang.setModifiedBy(Integer.parseInt(mapToken.get("uid").toString()));
            nextPengarang.setModifiedDate(new Date());

        } catch (Exception e) {
            strExceptionArr[1] = " delete(Long id, HttpServletRequest request)  --- LINE 174";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE12031", request);
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
        Optional<Pengarang> optionalPengarang = null;
        try{
            optionalPengarang = pengarangRepo.findByIsActiveAndIdPengarang(true,id);
            if(optionalPengarang.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageAkses.WARNING_AKSES_NOT_EXISTS,
                        HttpStatus.NOT_ACCEPTABLE,
                        null,//perubahan 21-12-2023
                        "FV12041",request);
            }
        }catch (Exception e)
        {
            strExceptionArr[1] = "findById(Long id, HttpServletRequest request) --- LINE 344";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    null,//perubahan 21-12-2023
                    "FE12041", request);
        }
        Pengarang pengarang = optionalPengarang.get();
        PengarangDTO pengarangDTO = modelMapper.map(pengarang, new TypeToken<PengarangDTO>() {}.getType());
        return new ResponseHandler().
                generateResponse(ConstantMessageGlobal.SUCCESS_FIND_BY,
                        HttpStatus.OK,
                        pengarangDTO,
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
        Page<Pengarang> pagePengarang = null;
        List<Pengarang> listPengarang = null;
        List<PengarangDTO> listPengarangDTO = null;
        Map<String,Object> mapResult = null;

        try
        {
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
                        strExceptionArr[1] = "find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request)  --- LINE 252";
                        LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
                        return new ResponseHandler().
                                generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                                        HttpStatus.INTERNAL_SERVER_ERROR,
                                        null,
                                        "FE12051",
                                        request);
                    }
                }
            }
            /*
                PENGISIAN DATA dan VALIDASI UNTUK PAGING ADA DI METHOD getDataByValue
             */
            pagePengarang = getDataByValue(pageable,columFirst,valueFirst);
            listPengarang = pagePengarang.getContent();
            if(listPengarang.size()==0)
            {
                return new ResponseHandler().
                        generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                                HttpStatus.NOT_FOUND,
                                null,
                                "FV12052",
                                request);
            }
            listPengarangDTO = modelMapper.map(listPengarang, new TypeToken<List<PengarangDTO>>() {}.getType());
            mapResult = transformToDTO.transformObject(objectMapper,listPengarangDTO,pagePengarang,listSearchParamDTO,columFirst,valueFirst);
        }

        catch (Exception e)
        {
            strExceptionArr[1] = "find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request) --- LINE 272";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    null,
                    "FE12051", request);
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

        /*
            biarkan saja kosong
            karena mapping ini dilakukan di client
            jika user diminta untuk mengisi data di file csv maka akan kesulitan untuk merelasikan data nya
         */
        return null;
    }

    private Page<Pengarang> getDataByValue(Pageable pageable, String columnFirst, String valueFirst)
    {
        if(valueFirst.equals("") || valueFirst==null)
        {
            return pengarangRepo.findByIsActive(pageable,true);
        }
        if(columnFirst.equals("id"))
        {
            return pengarangRepo.findByIsActiveAndIdPengarang(pageable,true,Long.parseLong(valueFirst));
        } else if (columnFirst.equals("nama")) {
            return pengarangRepo.findByIsActiveAndNamaPengarangContainsIgnoreCase(pageable,true,valueFirst);
        } else if (columnFirst.equals("alamat")) {
            return pengarangRepo.findByIsActiveAndAlamatContainsIgnoreCase(pageable,true,valueFirst);
        }

        return pengarangRepo.findByIsActive(pageable,true);// ini default kalau parameter search nya tidak sesuai--- asumsi nya di hit bukan dari web
    }

}