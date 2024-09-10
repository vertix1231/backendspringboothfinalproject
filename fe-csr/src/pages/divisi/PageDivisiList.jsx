import { useContext, useEffect, useState, useRef } from "react"
import ContextGeneric from "../../contexts/ContextGeneric"
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup } from "react-bootstrap"
import ComponentNavbar from "../../components/ComponentNavbar"
import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants"
import useValidationGroup from "../../hooks/useValidationGroup.jsx";


const PageDivisiList = () => {
  const { divisi } = useContext(ContextGeneric)
  const [searchParams, setSearchParams] = useState([]);
  const [divisiValidations, setDivisiValidations] = useState({});
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
    sizeComponent:3,
  })

  const searchDivisiRef = useRef({value: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    divisi.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const httpDivisiList = () => {
    setDivisiValidations({})
    divisi.http.list.execute({...params, valueFirst: searchDivisiRef.current.value || ""}).then((response) => {
      const {content, searchParam, ...sisa} = response.data.data;
      console.log("searchParam", searchParam);
      console.log("sisa", sisa);
      setSearchParams(searchParam);
      setParams({...params})
      searchDivisiRef.current.value = sisa.valueFirst;
      setPaging(sisa);
      divisi.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
    }).catch((error) => {
      // console.log("uuu error", error);
    })
  }

  const httpDivisiCreate = () => {
    setDivisiValidations({})
    divisi.http.create.execute(divisi.reducer.objects.state).then((response) => {
      divisi.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpDivisiList();
    }).catch((error) => {
      setDivisiValidations(validationGrup(error))
      // console.log(error);
    })
  }

  const httpDivisiUpdate = () => {
    setDivisiValidations({})
    const {idDivisi, ...payload} = divisi.reducer.objects.state
    divisi.http.update.execute({...payload}, idDivisi).then((response) => {
      divisi.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: divisi.reducer.objects.state, key: "idDivisi"})
      divisi.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpDivisiList();

    }).catch((error) => {
      // console.log(error);
      setDivisiValidations(validationGrup(error))
    })
  }

  const httpDivisiDelete = () => {
    const {idDivisi} = divisi.reducer.objects.state
      divisi.http.remove.execute(idDivisi).then((response) => {
        httpDivisiList();
        divisi.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      }).catch((error) => {
        // console.log(error);
      })
  }

  useEffect(() => {
    httpDivisiList()    
  }, [params.page])

const selectDivisi = (data) => {
  divisi.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
}

const onDivisiNext = () => {
  if (params.page < paging.totalPages) {
    console.log("lolos")
    setParams({...params, page: params.page + 1});
  } 
}

const onDivisiPrevious = () => {
  if (params.page > 0) {
    setParams({...params, page: params.page-1});
  }
}

// const onDivisiSearch = () => {
//   divisi.http.list.execute({...params, valueFirst: searchDivisiRef.current.value || ""}).then((response) => {
//     const {content, searchParam, ...sisa} = response.data.data;
//     setSearchParams(searchParam);
//     searchDivisiRef.current.value = sisa.valueFirst;
//     divisi.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
//     divisi.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
//     setPaging(sisa);
//   }).catch((error) => {
//     console.log(error);
//   })
// }

  return (
    <>
      <ComponentNavbar />
      <Container className="mt-4 mb-4">
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Body className="">
                <Form.Group className="mb-3">
                  <Form.Label>Nama Divisi</Form.Label>
                  <Form.Control 
                    placeholder="Nama"
                    name={"namaDivisi"}
                    onChange={handleChange}
                    value={divisi.reducer.objects.state.namaDivisi || ""}
                  />
                  {divisiValidations.namaDivisi && (
                      <ul className="list-unstyled">
                        {divisiValidations.namaDivisi.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group >
                <Form.Group className="mb-3">
                <Form.Label>Kode Divisi</Form.Label>
                  <Form.Control 
                    placeholder="Kode"
                    name={"kodeDivisi"}
                    onChange={handleChange}
                    value={divisi.reducer.objects.state.kodeDivisi || ""}
                  />
                  {divisiValidations.kodeDivisi && (
                      <ul className="list-unstyled">
                        {divisiValidations.kodeDivisi.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group>
                <Form.Group>
                <Form.Label>Deskripsi</Form.Label>
                  <Form.Control 
                    placeholder="Deskripsi"
                    as={"textarea"}
                    name={"deskripsiDivisi"}
                    onChange={handleChange}
                    value={divisi.reducer.objects.state.deskripsiDivisi || ""}
                  />
                  {divisiValidations.deskripsiDivisi && (
                      <ul className="list-unstyled">
                        {divisiValidations.deskripsiDivisi.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button variant="outline-primary" onClick={() => {
                    divisi.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
                    setDivisiValidations({})
                  }}>
                    Clear
                  </Button>
                  {divisi.reducer.objects.state.idDivisi ? (
                    <>
                        <Button variant="outline-primary" onClick={httpDivisiDelete}>Delete</Button>
                        <Button onClick={httpDivisiUpdate}>Update</Button>
                    </>
                  ) : (
                    <Button onClick={httpDivisiCreate}>Submit</Button>
                  )}
                  
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body className="d-flex justify-content-end align-items-start" >
                <Card.Title>Divisi Management</Card.Title>
                {/* {JSON.stringify(searchParams)}
                {JSON.stringify(params)} */}
                <InputGroup className="w-70">
                  <Form.Select onChange={(e) => {
                    searchDivisiRef.current.value = ""
                    setParams({...params, columnFirst: e.target.value});
                  }}>
                    {!params.columnFirst && (
                      <option>Pilih ...</option>
                    )}
                    {searchParams.map((val, index) => (
                      <option key={index} value={val.key}>{val.label}</option>
                    ))}
                  </Form.Select>
                  {/* untuk form validation , jika memilih ID maka di textField searchnya hanya bisa input angka saja
                  special case untuk huruf e , masih boleh dikarenakan digunakan untuk matematika IS0-????? */}
                  <Form.Control ref={searchDivisiRef} />
                  <Button onClick={httpDivisiList}>Search</Button>
                </InputGroup>
              </Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Divisi</th>
                    <th>Kode Divisi</th>
                    <th>Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
                  {divisi.reducer.list.state.map((value) => (
                    <tr key={value.idDivisi} onClick={() => selectDivisi(value)}>
                      <td>{value.idDivisi}</td>
                      <td>{value.namaDivisi}</td>
                      <td>{value.kodeDivisi}</td>
                      <td>{value.deskripsiDivisi}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button disabled={params.page <= 0} onClick={onDivisiPrevious}>Prev</Button>
                  <Button disabled={params.page >= paging.totalPages - 1} onClick={onDivisiNext}>Next</Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageDivisiList;