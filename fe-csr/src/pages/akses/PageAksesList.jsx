import { useContext, useEffect, useState, useRef } from "react"
import ContextGeneric from "../../contexts/ContextGeneric.jsx"
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup, Dropdown } from "react-bootstrap"
import ComponentNavbar from "../../components/ComponentNavbar.jsx"
import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants.js"
import useValidationGroup from "../../hooks/useValidationGroup.jsx";
import ComponentListMenuAkses from "../../components/ComponentListMenuAkses.jsx"
import ComponentAksesCreate from "../../components/ComponentAksesCreate.jsx"

const aksesInit = {namaAkses: null, divisi: null}

const PageAksesList = () => {

  const { akses } = useContext(ContextGeneric)
  const [daftarGroupDivisi, setDaftarGroupDivisi] = useState([]);
  const [daftarGroupMenu, setDaftarGroupMenu] = useState([]);

  const [searchParams, setSearchParams] = useState([]);
  const [aksesValidations, setAksesValidations] = useState({});
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

  const searchAksesRef = useRef({value: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    akses.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const httpAksesList = () => {
    setAksesValidations({})
    akses.http.list.execute({...params, valueFirst: searchAksesRef.current.value || ""}).then((response) => {

      /*
        untuk yang ini dibaca dari response nya
        ...sisa adalah selain daripada field yang sebelumnya
        misal : response nya adalah p,q,r,s,t ==> {p,q,r,,....sisa}
        maka sisa adalah s,t
       */
      const {content, searchParam, listGroupDivisi, listGroupMenu, ...sisa} = response.data.data;

      setDaftarGroupDivisi(listGroupDivisi);
      setDaftarGroupMenu(listGroupMenu);
      setSearchParams(searchParam);
      setParams({...params})
      searchAksesRef.current.value = sisa.valueFirst;
      setPaging(sisa);
      akses.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
    }).catch((error) => {
      akses.reducer.objects.dispatch({
        type: REDUCER_OBJECT_ACTIONS.SET,
        data: {listGroupDivisi : error.data.listGroupDivisi,
          listGroupMenu: error.data.listGroupMenu}
      })
    })
  }

  const httpAksesCreate = () => {
    setAksesValidations({})
    const {listGroup, ...payload} = akses.reducer.objects.state
    akses.http.create.execute(payload).then((response) => {
      akses.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpAksesList();
    }).catch((error) => {
      setAksesValidations(validationGrup(error))
    })
  }

  const httpAksesUpdate = () => {
    setAksesValidations({})
    const {idAkses, listGroup, ...payload} = akses.reducer.objects.state
    akses.http.update.execute({...payload}, idAkses).then((response) => {
      akses.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: akses.reducer.objects.state, key: "idAkses"})
      akses.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpAksesList();
    }).catch((error) => {
      setAksesValidations(validationGrup(error))
    })
  }

  const httpAksesDelete = () => {
    const {idAkses} = akses.reducer.objects.state
    akses.http.remove.execute(idAkses).then((response) => {
        
      akses.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
        httpAksesList();
      }).catch((error) => {
      })
  }

  useEffect(() => {
    httpAksesList()  
      akses.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, 
      data: aksesInit
    })
  }, [params.page])

const selectAkses = (data) => {
  akses.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
}

const onAksesNext = () => {
  if (params.page < paging.totalPages) {
    setParams({...params, page: params.page + 1});
  }
}

const onAksesPrevious = () => {
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
                {akses.reducer.objects.state && (
                  <ComponentAksesCreate
                    title={"Buat Akses"}
                    pAkses={null}
                    pListGroupDivisi={daftarGroupDivisi}
                    pListGroupMenu={daftarGroupMenu}
                  />
                )}
              </Card.Header>
              <Card.Body className="d-flex justify-content-end align-items-start" >

                <Card.Title>Akses Management</Card.Title>                
                <InputGroup className="w-30">
                  <Form.Select onChange={(e) => {
                    searchAksesRef.current.value = ""
                    setParams({...params, columnFirst: e.target.value});
                  }}>
                    {!params.columnFirst && (
                      <option>Pilih ...</option>
                    )}
                    {searchParams.map((val, index) => (
                      <option key={index} value={val.key}>{val.label}</option>
                    ))}
                  </Form.Select>                  
                  <Form.Control ref={searchAksesRef} />
                  <Button onClick={httpAksesList}>Search</Button>
                </InputGroup>
              </Card.Body>
              
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Divisi</th>
                    <th>Menu</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
                  {akses.reducer.list.state.map((value) => (
                    <tr key={value.idAkses} onClick={() => selectAkses(value)}>
                      <td>{value.idAkses}</td>
                      <td>{value.namaAkses}</td>
                      <td>{value.divisi.namaDivisi}</td>
                      <td>
                        <ComponentListMenuAkses listMenuAkses={value.listMenuAkses} />
                      </td>
                      <td>
                        <ComponentAksesCreate
                          title={"Edit Akses"}
                          pAkses={value}
                          pListGroupDivisi={daftarGroupDivisi}
                          pListGroupMenu={daftarGroupMenu}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  {/*secara otomatis akan membuat enable jika kondisi yang didalam nya tidak terpenuhi*/}
                  <Button disabled={params.page <= 0} onClick={onAksesPrevious}>Prev</Button>
                  <Button disabled={params.page >= paging.totalPages - 1} onClick={onAksesNext}>Next</Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageAksesList;