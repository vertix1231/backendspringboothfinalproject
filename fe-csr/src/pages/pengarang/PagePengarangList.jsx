import { useContext, useEffect, useState, useRef } from "react"
import ContextGeneric from "../../contexts/ContextGeneric"
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup } from "react-bootstrap"
import ComponentNavbar from "../../components/ComponentNavbar"
import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants"
import useValidationGroup from "../../hooks/useValidationGroup.jsx";

const pengarangInit = {namaPengarang: null, alamat: null}
const PagePengarangList = () => {
  const { pengarang } = useContext(ContextGeneric)
  const [searchParams, setSearchParams] = useState([]);
  const [pengarangValidations, setPengarangValidations] = useState({});
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

  const searchPengarangRef = useRef({value: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    pengarang.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const httpPengarangList = () => {
    setPengarangValidations({})
    pengarang.http.list.execute({...params, valueFirst: searchPengarangRef.current.value || ""}).then((response) => {
      const {content, searchParam, ...sisa} = response.data.data;
      console.log("searchParam", searchParam);
      console.log("sisa", sisa);
      setSearchParams(searchParam);
      setParams({...params})
      searchPengarangRef.current.value = sisa.valueFirst;
      setPaging(sisa);
      pengarang.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
    }).catch((error) => {
      // console.log("uuu error", error);
    })
  }

  const httpPengarangCreate = () => {
    setPengarangValidations({})
    pengarang.http.create.execute(pengarang.reducer.objects.state).then((response) => {
      pengarang.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpPengarangList();
    }).catch((error) => {
      setPengarangValidations(validationGrup(error))
      // console.log(error);
    })
  }

  const httpPengarangUpdate = () => {
    setPengarangValidations({})
    const {idPengarang, ...payload} = pengarang.reducer.objects.state
    pengarang.http.update.execute({...payload}, idPengarang).then((response) => {
      pengarang.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: pengarang.reducer.objects.state, key: "idPengarang"})
      pengarang.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpPengarangList();

    }).catch((error) => {
      // console.log(error);
      setPengarangValidations(validationGrup(error))
    })
  }

  const httpPengarangDelete = () => {
    const {idPengarang} = pengarang.reducer.objects.state
      pengarang.http.remove.execute(idPengarang).then((response) => {
        httpPengarangList();
        pengarang.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      }).catch((error) => {
        // console.log(error);
      })
  }

  useEffect(() => {
    httpPengarangList()
  }, [params.page])

const selectPengarang = (data) => {
  pengarang.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
}

const onPengarangNext = () => {
  if (params.page < paging.totalPages) {
    console.log("lolos")
    setParams({...params, page: params.page + 1});
  } 
}

const onPengarangPrevious = () => {
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
                  <Form.Label>Nama Pengarang</Form.Label>
                  <Form.Control 
                    placeholder="Nama Pengarang"
                    name={"namaPengarang"}
                    onChange={handleChange}
                    value={pengarang.reducer.objects.state.namaPengarang || ""}
                  />
                  {pengarangValidations.namaPengarang && (
                      <ul className="list-unstyled">
                        {pengarangValidations.namapengarang.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group >
                <Form.Group className="mb-3">
                <Form.Label>Alamat</Form.Label>
                  <Form.Control 
                    placeholder="Alamat"
                    name={"alamat"}
                    onChange={handleChange}
                    value={pengarang.reducer.objects.state.alamat || ""}
                  />
                  {pengarangValidations.alamat && (
                      <ul className="list-unstyled">
                        {pengarangValidations.kodepengarang.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button variant="outline-primary" onClick={() => {
                    pengarang.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
                    setPengarangValidations({})
                  }}>
                    Clear
                  </Button>
                  {pengarang.reducer.objects.state.idPengarang ? (
                    <>
                        <Button variant="outline-primary" onClick={httpPengarangDelete}>Delete</Button>
                        <Button onClick={httpPengarangUpdate}>Update</Button>
                    </>
                  ) : (
                    <Button onClick={httpPengarangCreate}>Submit</Button>
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
                <Card.Title>Pengarang</Card.Title>
                {/* {JSON.stringify(searchParams)}
                {JSON.stringify(params)} */}
                <InputGroup className="w-70">
                  <Form.Select onChange={(e) => {
                    searchPengarangRef.current.value = ""
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
                  <Form.Control ref={searchPengarangRef} />
                  <Button onClick={httpPengarangList}>Search</Button>
                </InputGroup>
              </Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Pengarang</th>
                    <th>Alamat</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
                  {pengarang.reducer.list.state.map((value) => (
                    <tr key={value.idPengarang} onClick={() => selectPengarang(value)}>
                      <td>{value.idPengarang}</td>
                      <td>{value.namaPengarang}</td>
                      <td>{value.alamat}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button disabled={params.page <= 0} onClick={onPengarangPrevious}>Prev</Button>
                  <Button disabled={params.page >= paging.totalPages - 1} onClick={onPengarangNext}>Next</Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PagePengarangList;