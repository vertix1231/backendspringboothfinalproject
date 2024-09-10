import { useContext, useEffect, useState, useRef } from "react"
import ContextGeneric from "../../contexts/ContextGeneric.jsx"
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup, Dropdown } from "react-bootstrap"
import ComponentNavbar from "../../components/ComponentNavbar.jsx"
import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants.js"
import useValidationGroup from "../../hooks/useValidationGroup.jsx";
import ComponentListPengarang from "../../components/ComponentListPengarang.jsx"
import ComponentBukuCreate from "../../components/ComponentBukuCreate.jsx";

const aksesInit = {namaAkses: null, divisi: null}

const PageBukuList = () => {

  const { buku } = useContext(ContextGeneric)
  const [daftarGroupKategoriBuku, setDaftarGroupKategoriBuku] = useState([]);
  const [daftarGroupPengarang, setDaftarGroupPengarang] = useState([]);

  const [searchParams, setSearchParams] = useState([]);
  const [bukuValidations, setBukuValidations] = useState({});
  const validationGrup = useValidationGroup();

  const [paging, setPaging] = useState({
    totalPages: 0,
    totalItems: 0,
    numberOfElements: 0,
  })

  const [params, setParams] = useState({
    page: 0,
    sort: "asc",
    sortby:"id",
    columnFirst:"",
    valueFirst:"",
    sizeComponent: 10,
  })

  const searchBukuRef = useRef({value: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const httpBukuList = () => {
    setBukuValidations({})
    buku.http.list.execute({...params, valueFirst: searchBukuRef.current.value || ""}).then((response) => {

      /*
        untuk yang ini dibaca dari response nya
        ...sisa adalah selain daripada field yang sebelumnya
        misal : response nya adalah p,q,r,s,t ==> {p,q,r,,....sisa}
        maka sisa adalah s,t
       */
      const {content, searchParam, listGroupKategoriBuku, listGroupPengarang, ...sisa} = response.data.data;

      setDaftarGroupKategoriBuku(listGroupKategoriBuku);
      setDaftarGroupPengarang(listGroupPengarang);
      setSearchParams(searchParam);
      setParams({...params})
      searchBukuRef.current.value = sisa.valueFirst;
      setPaging(sisa);
      buku.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
    }).catch((error) => {
      buku.reducer.objects.dispatch({
        type: REDUCER_OBJECT_ACTIONS.SET,
        data: {listGroupKategoriBuku : error.data.listGroupKategoriBuku,
          listGroupPengarang: error.data.listGroupPengarang}
      })
    })
  }

  const httpBukuCreate = () => {
    setBukuValidations({})
    const {listGroup, ...payload} = buku.reducer.objects.state
    buku.http.create.execute(payload).then((response) => {
      buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpBukuList();
    }).catch((error) => {
      setBukuValidations(validationGrup(error))
    })
  }

  const httpBukuUpdate = () => {
    setBukuValidations({})
    const {idBuku, listGroup, ...payload} = buku.reducer.objects.state
    buku.http.update.execute({...payload}, idBuku).then((response) => {
      buku.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: buku.reducer.objects.state, key: "idBuku"})
      buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpBukuList();
    }).catch((error) => {
      setBukuValidations(validationGrup(error))
    })
  }

  const httpBukuDelete = () => {
    const {idBuku} = buku.reducer.objects.state
    buku.http.remove.execute(idBuku).then((response) => {
      buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpBukuList();
    }).catch((error) => {
    })
  }

  useEffect(() => {
    httpBukuList()
    buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET,
      data: aksesInit
    })
  }, [params.page])

  const selectBuku = (data) => {
    buku.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
  }

  const onBukuNext = () => {
    if (params.page < paging.totalPages) {
      setParams({...params, page: params.page + 1});
    }
  }

  const onBukuPrevious = () => {
    if (params.page > 0) {
      setParams({...params, page: params.page-1});
    }
  }
  return (
      <>
        <ComponentNavbar />
        <Container className="mt-4 mb-4">
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  {buku.reducer.objects.state && (
                      <ComponentBukuCreate
                          title={"Buat Buku"}
                          pBuku={null}
                          pListGroupPengarang={daftarGroupPengarang}
                          pListGroupKategoriBuku={daftarGroupKategoriBuku}

                      />
                  )}
                </Card.Header>
                <Card.Body className="d-flex justify-content-end align-items-start" >

                  <Card.Title>Buku</Card.Title>
                  <InputGroup className="w-30">
                    <Form.Select onChange={(e) => {
                      searchBukuRef.current.value = ""
                      setParams({...params, columnFirst: e.target.value});
                    }}>
                      {!params.columnFirst && (
                          <option>Pilih ...</option>
                      )}
                      {searchParams.map((val, index) => (
                          <option key={index} value={val.key}>{val.label}</option>
                      ))}
                    </Form.Select>
                    <Form.Control ref={searchBukuRef} />
                    <Button onClick={httpBukuList}>Search</Button>
                  </InputGroup>
                </Card.Body>

                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Judul</th>
                    <th>Kategori</th>
                    <th>Pengarang</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
                  {buku.reducer.list.state.map((value) => (
                      <tr key={value.idBuku} onClick={() => selectBuku(value)}>
                        <td>{value.idBuku}</td>
                        <td>{value.judulBuku}</td>
                        <td>{value.kategoriBuku.namaKategoriBuku}</td>
                        <td>
                          <ComponentListPengarang listPengarang={value.listPengarang} />
                        </td>
                        <td>
                          <ComponentBukuCreate
                              title={"Edit Buku"}
                              pBuku={value}
                              pListGroupPengarang={daftarGroupPengarang}
                              pListGroupKategoriBuku={daftarGroupKategoriBuku}
                          />
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </Table>
                <Card.Footer className="d-flex justify-content-end">
                  <ButtonGroup>
                    {/*secara otomatis akan membuat enable jika kondisi yang didalam nya tidak terpenuhi*/}
                    <Button disabled={params.page <= 0} onClick={onBukuPrevious}>Prev</Button>
                    <Button disabled={params.page >= paging.totalPages - 1} onClick={onBukuNext}>Next</Button>
                  </ButtonGroup>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
  )
}

export default PageBukuList;