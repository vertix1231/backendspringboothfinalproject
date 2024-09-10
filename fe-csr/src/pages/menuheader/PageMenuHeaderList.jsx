import { useContext, useEffect, useState, useRef } from "react"
import ContextGeneric from "../../contexts/ContextGeneric"
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup } from "react-bootstrap"
import ComponentNavbar from "../../components/ComponentNavbar"
import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants"
import useValidationGroup from "../../hooks/useValidationGroup.jsx";


const PageMenuHeaderList = () => {

  const { menuheader } = useContext(ContextGeneric)
  const [searchParams, setSearchParams] = useState([]);
  const [menuHeaderValidations, setMenuHeaderValidations] = useState({});
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

  const searchMenuHeaderRef = useRef({value: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    menuheader.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const httpMenuHeaderList = () => {
    setMenuHeaderValidations({})
    menuheader.http.list.execute({...params, valueFirst: searchMenuHeaderRef.current.value || ""}).then((response) => {
      const {content, searchParam, ...sisa} = response.data.data;
      console.log("searchParam", searchParam);
      console.log("sisa", sisa);
      setSearchParams(searchParam);
      setParams({...params})
      searchMenuHeaderRef.current.value = sisa.valueFirst;
      setPaging(sisa);

      menuheader.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
    }).catch((error) => {
      // console.log("uuu error", error);
    })
  }

  const httpMenuHeaderCreate = () => {
    setMenuHeaderValidations({})
    menuheader.http.create.execute(menuheader.reducer.objects.state).then((response) => {
      menuheader.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpMenuHeaderList();
    }).catch((error) => {
      // console.log(error);
      setMenuHeaderValidations(validationGrup(error))
    })
  }

  const httpMenuHeaderUpdate = () => {
    setMenuHeaderValidations({})
    const {idMenuheader, ...payload} = menuheader.reducer.objects.state
    menuheader.http.update.execute({...payload}, idMenuHeader).then((response) => {
      menuheader.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: menuheader.reducer.objects.state, key: "idMenuHeader"})
      menuheader.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpMenuHeaderList();

    }).catch((error) => {
      // console.log(error);
      setMenuHeaderValidations(validationGrup(error))
    })
  }

  const httpMenuHeaderDelete = () => {
    setMenuHeaderValidations({})
    const {idMenuHeader} = menuheader.reducer.objects.state
    menuheader.http.remove.execute(idMenuHeader).then((response) => {
        httpMenuHeaderList();
        menuheader.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      }).catch((error) => {
        // console.log(error);
      })
  }

  useEffect(() => {
    httpMenuHeaderList()    
  }, [params.page])

const selectMenuHeader = (data) => {
  menuheader.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
}

const onMenuHeaderNext = () => {
  if (params.page < paging.totalPages) {
    setParams({...params, page: params.page + 1});
  } 
}

const onMenuHeaderPrevious = () => {
  if (params.page > 0) {
    setParams({...params, page: params.page-1});
  }
}
  return (
    <>
      <ComponentNavbar />
      <Container className="mt-4 mb-4">
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Body className="">
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control 
                    placeholder="Nama"
                    name={"namaMenuHeader"}
                    onChange={handleChange}
                    value={menuheader.reducer.objects.state.namaMenuHeader || ""}
                  />
                  {menuHeaderValidations.namaMenuHeader && (
                      <ul className="list-unstyled">
                        {menuHeaderValidations.namaMenuHeader.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group >                
                <Form.Group>
                <Form.Label>Deskripsi</Form.Label>
                  <Form.Control 
                    placeholder="Deskripsi"
                    as={"textarea"}
                    name={"deskripsiMenuHeader"}
                    onChange={handleChange}
                    value={menuheader.reducer.objects.state.deskripsiMenuHeader || ""}
                  />
                  {menuHeaderValidations.deskripsiMenuHeader && (
                      <ul className="list-unstyled">
                        {menuHeaderValidations.deskripsiMenuHeader.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button variant="outline-primary" onClick={() => {
                    menuheader.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
                    setMenuHeaderValidations({})
                  }}>
                    Clear
                  </Button>
                  {menuheader.reducer.objects.state.idMenuHeader ? (
                    <>
                        <Button variant="outline-primary" onClick={httpMenuHeaderDelete}>Delete</Button>
                        <Button onClick={httpMenuHeaderUpdate}>Update</Button>
                    </>
                  ) : (
                    <Button onClick={httpMenuHeaderCreate}>Submit</Button>
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
                <Card.Title>Menu Header Management</Card.Title>                
                <InputGroup className="w-70">
                  <Form.Select onChange={(e) => {
                    searchMenuHeaderRef.current.value = ""
                    setParams({...params, columnFirst: e.target.value});
                  }}>
                    {!params.columnFirst && (
                      <option>Pilih ...</option>
                    )}
                    {searchParams.map((val, index) => (
                      <option key={index} value={val.key}>{val.label}</option>
                    ))}
                  </Form.Select>                  
                  <Form.Control ref={searchMenuHeaderRef} />
                  <Button onClick={httpMenuHeaderList}>Search</Button>
                </InputGroup>
              </Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
                  {menuheader.reducer.list.state.map((value) => (
                    <tr key={value.idMenuHeader} onClick={() => selectMenuHeader(value)}>
                      <td>{value.idMenuHeader}</td>
                      <td>{value.namaMenuHeader}</td>
                      <td>{value.deskripsiMenuHeader}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button disabled={params.page <= 0} onClick={onMenuHeaderPrevious}>Prev</Button>
                  <Button disabled={params.page >= paging.totalPages - 1} onClick={onMenuHeaderNext}>Next</Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageMenuHeaderList;