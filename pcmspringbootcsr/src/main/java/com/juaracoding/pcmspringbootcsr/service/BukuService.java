package com.juaracoding.pcmspringbootcsr.service;

import com.juaracoding.pcmspringbootcsr.configuration.OtherConfig;
import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageAkses;
import com.juaracoding.pcmspringbootcsr.constant.ConstantMessageGlobal;
import com.juaracoding.pcmspringbootcsr.core.IService;
import com.juaracoding.pcmspringbootcsr.core.security.ModulAuthority;
import com.juaracoding.pcmspringbootcsr.dto.KategoriBukuDTO;
import com.juaracoding.pcmspringbootcsr.dto.SearchParamDTO;
import com.juaracoding.pcmspringbootcsr.dto.buku.BukuDTO;
import com.juaracoding.pcmspringbootcsr.dto.divisi.DivisiOptionDTO;
import com.juaracoding.pcmspringbootcsr.dto.menu.MenuOptionDTO;
import com.juaracoding.pcmspringbootcsr.dto.pengarang.PengarangOptionDTO;
import com.juaracoding.pcmspringbootcsr.handler.ResponseHandler;
import com.juaracoding.pcmspringbootcsr.model.Buku;
import com.juaracoding.pcmspringbootcsr.repo.*;
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
    Modul Code = 11
 */
@Service
@Transactional
public class BukuService implements IService<Buku> {
    private BukuRepo bukuRepo;
    private KategoriBukuRepo kategoriBukuRepo;
    @Autowired
    private PengarangRepo pengarangRepo;
    private String[] strExceptionArr = new String[2];
    @Autowired
    private ModelMapper modelMapper;
    private Map<String,Object> objectMapper = new HashMap<String,Object>();
    private TransformToDTO transformToDTO = new TransformToDTO();
    private List<SearchParamDTO> listSearchParamDTO  = new ArrayList<>();
    private Map<String,Object> mapToken = new HashMap<String,Object>();
    private List<KategoriBukuDTO> ltKategoriBukuDTO = null;
    private List<PengarangOptionDTO> ltPengarangOptionDTO = null;
    private String authorizationCode = "35";

    @Autowired
    private ModulAuthority modulAuthority;

    private Map<String,Object> mapComponent = new HashMap<String,Object>();

    @Autowired
    public BukuService(BukuRepo bukuRepo, KategoriBukuRepo kategoriBukuRepo) {
        strExceptionArr[0]="BukuService";
        mapColumn();
        this.bukuRepo = bukuRepo;
        this.kategoriBukuRepo = kategoriBukuRepo;
    }

    private void mapColumn()
    {
        listSearchParamDTO.add(new SearchParamDTO("id","ID"));
        listSearchParamDTO.add(new SearchParamDTO("judul","JUDUL"));
        listSearchParamDTO.add(new SearchParamDTO("kategori","KATEGORI"));
    }

    @Override
    public ResponseEntity<Object> save(Buku buku, HttpServletRequest request) {
        getMasterComponent();
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        if(buku==null)
        {
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.BAD_REQUEST,
                    mapComponent,//perubahan 21-12-2023
                    "FV11001", request);//FAILED VALIDATION
        }
        try {

            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            buku.setCreatedBy(Integer.parseInt(mapToken.get("uid").toString()));
            buku.setCreatedDate(new Date());
            bukuRepo.save(buku);
        } catch (Exception e) {
            strExceptionArr[1] = "save(Buku buku, HttpServletRequest request) --- LINE 82";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    mapComponent,//perubahan 21-12-2023
                    "FE11001", request);//FAILED ERROR
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_SAVE,
                HttpStatus.CREATED,
                mapComponent,
                null, request);
    }

    @Override
    public ResponseEntity<Object> saveBatch(List<Buku> lt, HttpServletRequest request) {
        getMasterComponent();
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
                    mapComponent,//perubahan 21-12-2023
                    "FV11011", request);
        }
        mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
        Integer intUserId = Integer.parseInt(mapToken.get("uid").toString());
        for(int i=0;i<lt.size();i++)
        {
            lt.get(i).setCreatedBy(intUserId);//input userid di masing2 data yang akan di save
            lt.get(i).setCreatedDate(new Date());//input userid di masing2 data yang akan di save
        }
        try {
            bukuRepo.saveAll(lt);
        } catch (Exception e) {
            strExceptionArr[1] = "saveBatch(List<Buku> lt, HttpServletRequest request) --- LINE 115";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    mapComponent,//perubahan 21-12-2023
                    "FE11011", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_SAVE,
                HttpStatus.CREATED,
                mapComponent,//perubahan 21-12-2023
                null, request);
    }

    @Override
    public ResponseEntity<Object> edit(Long id, Buku buku, HttpServletRequest request) {
        getMasterComponent();
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        try {
            Optional<Buku> optionalAkses = bukuRepo.findByIsActiveAndIdBuku(true,id);
            if(optionalAkses.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageAkses.WARNING_AKSES_NOT_EXISTS,
                        HttpStatus.NOT_ACCEPTABLE,
                        mapComponent,//perubahan 21-12-2023
                        "FV11021",request);
            }
            Buku nextBuku = optionalAkses.get();
            nextBuku.setJudulBuku(buku.getJudulBuku());
            nextBuku.setKategoriBuku(buku.getKategoriBuku());
            nextBuku.setListPengarang(buku.getListPengarang());
            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            nextBuku.setModifiedBy(Integer.parseInt(mapToken.get("uid").toString()));
            nextBuku.setModifiedDate(new Date());

        } catch (Exception e) {
            strExceptionArr[1] = " edit(Long id, Buku buku, HttpServletRequest request) --- LINE 141";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    mapComponent,//perubahan 21-12-2023
                    "FE11021", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_UPDATE,
                HttpStatus.OK,
                mapComponent,//perubahan 21-12-2023
                null, request);
    }

    @Override
    public ResponseEntity<Object> delete(Long id, HttpServletRequest request) {
        getMasterComponent();
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        Optional<Buku> optionalBuku = null;
        Buku nextBuku = null;
        try {
            optionalBuku = bukuRepo.findByIsActiveAndIdBuku(true,id);
            if(optionalBuku.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                        HttpStatus.NOT_ACCEPTABLE,
                        mapComponent,//perubahan 21-12-2023
                        "FV11031",request);
            }
            nextBuku = optionalBuku.get();
            nextBuku.setActive(false);
            mapToken = modulAuthority.checkAuthorization(request);//ambil userid dari token
            nextBuku.setModifiedBy(Integer.parseInt(mapToken.get("uid").toString()));
            nextBuku.setModifiedDate(new Date());

        } catch (Exception e) {
            strExceptionArr[1] = " delete(Long id, HttpServletRequest request)  --- LINE 174";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    mapComponent,//perubahan 21-12-2023
                    "FE11031", request);
        }
        return new ResponseHandler().generateResponse(ConstantMessageGlobal.SUCCESS_DELETE,
                HttpStatus.OK,
                mapComponent,
                null, request);
    }

    @Override
    public ResponseEntity<Object> findById(Long id, HttpServletRequest request)
    {
        getMasterComponent();
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        Optional<Buku> optionalAkses = null;
        try{
            optionalAkses = bukuRepo.findByIsActiveAndIdBuku(true,id);
            if(optionalAkses.isEmpty())
            {
                return new ResponseHandler().generateResponse(ConstantMessageAkses.WARNING_AKSES_NOT_EXISTS,
                        HttpStatus.NOT_ACCEPTABLE,
                        mapComponent,//perubahan 21-12-2023
                        "FV11041",request);
            }
        }catch (Exception e)
        {
            strExceptionArr[1] = "findById(Long id, HttpServletRequest request) --- LINE 344";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_SAVE_FAILED,
                    HttpStatus.BAD_REQUEST,
                    mapComponent,//perubahan 21-12-2023
                    "FE11041", request);
        }
        Buku nextBuku = optionalAkses.get();
        BukuDTO bukuDTO = modelMapper.map(nextBuku, new TypeToken<BukuDTO>() {}.getType());
        return new ResponseHandler().
                generateResponse(ConstantMessageGlobal.SUCCESS_FIND_BY,
                        HttpStatus.OK,
                        bukuDTO,
                        mapComponent,//perubahan 21-12-2023
                        request);
    }

    @Override
    public ResponseEntity<Object> find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request) {
        getMasterComponent();//perubahan 21-12-2023
        mapToken = modulAuthority.checkAuthorization(request,authorizationCode);//ambil userid dari token
        if(!(Boolean)mapToken.get("isValid")){
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_FORBIDEN,
                    HttpStatus.FORBIDDEN,
                    null,
                    "X-AUTH-001", request);
        }
        Page<Buku> pageBuku = null;
        List<Buku> listBuku = null;
        List<BukuDTO> listBukuDTO = null;
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
                                        mapComponent,//perubahan 21-12-2023
                                        "FE11051",
                                        request);
                    }
                }
            }
            /*
                PENGISIAN DATA dan VALIDASI UNTUK PAGING ADA DI METHOD getDataByValue
             */
            pageBuku = getDataByValue(pageable,columFirst,valueFirst);
            listBuku = pageBuku.getContent();
            if(listBuku.size()==0)
            {
                return new ResponseHandler().
                        generateResponse(ConstantMessageGlobal.WARNING_DATA_EMPTY,
                                HttpStatus.NOT_FOUND,
                                mapComponent,
                                "FV11052",
                                request);
            }
            listBukuDTO = modelMapper.map(listBuku, new TypeToken<List<BukuDTO>>() {}.getType());

            mapResult = transformToDTO.transformObject(objectMapper,listBukuDTO,pageBuku,listSearchParamDTO,columFirst,valueFirst, mapComponent);
        }

        catch (Exception e)
        {
            strExceptionArr[1] = "find(Pageable pageable, String columFirst, String valueFirst, HttpServletRequest request) --- LINE 272";
            LoggingFile.exceptionStringz(strExceptionArr, e, OtherConfig.getFlagLoging());
            return new ResponseHandler().generateResponse(ConstantMessageGlobal.ERROR_DATA_INVALID,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    mapComponent,
                    "FE11051", request);
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

    private Page<Buku> getDataByValue(Pageable pageable, String columnFirst, String valueFirst)
    {
        if(valueFirst.equals("") || valueFirst==null)
        {
            return bukuRepo.findByIsActive(pageable,true);
        }
        if(columnFirst.equals("id"))
        {
            return bukuRepo.findByIsActiveAndIdBuku(pageable,true,Long.parseLong(valueFirst));
        } else if (columnFirst.equals("judul")) {
            return bukuRepo.findByIsActiveAndJudulBukuContainsIgnoreCase(pageable,true,valueFirst);
        } else if (columnFirst.equals("tahun")) {
            return bukuRepo.findByIsActiveAndTahunTerbit(pageable,true,valueFirst);
        } else if (columnFirst.equals("kategori")) {
            return bukuRepo.findByIsActiveAndNamaKategoriBuku(pageable,true,valueFirst);
        }

        return bukuRepo.findByIsActive(pageable,true);// ini default kalau parameter search nya tidak sesuai--- asumsi nya di hit bukan dari web
    }

    private Map<String,Object> getMasterComponent(){
        ltKategoriBukuDTO =  modelMapper.map(kategoriBukuRepo.findByIsActive(true), new TypeToken<List<KategoriBukuDTO>>() {}.getType());
        ltPengarangOptionDTO =  modelMapper.map(pengarangRepo.findByIsActive(true), new TypeToken<List<PengarangOptionDTO>>() {}.getType());
        mapComponent.put("listGroupKategoriBuku", ltKategoriBukuDTO);
        mapComponent.put("listGroupPengarang", ltPengarangOptionDTO);

        return mapComponent;
    }
}