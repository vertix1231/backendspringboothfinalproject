import { useContext, useEffect, useState, useRef } from "react"
import ContextGeneric from "../../contexts/ContextGeneric"
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup } from "react-bootstrap"
import ComponentNavbar from "../../components/ComponentNavbar"
import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants"
import useValidationGroup from "../../hooks/useValidationGroup.jsx";


const PageKategoriBukuList = () => {
  const { kategoriBuku } = useContext(ContextGeneric)
  const [searchParams, setSearchParams] = useState([]);//gak perlu dirubah
  const [kategoriBukuValidations, setKategoriBukuValidations] = useState({});
  const validationGrup = useValidationGroup();//gak perlu dirubah

  const [paging, setPaging] = useState({//gak perlu dirubah
    totalPages: 0,
    totalItems: 0,
    numberOfElements: 0,
  })

  const [params, setParams] = useState({//gak perlu dirubah
    page: 0,
    sort: "asc",
    sortby:"id",
    columnFirst:"",
    valueFirst:"",
    sizeComponent:3,
  })

  const searchKategoriBukuRef = useRef({value: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    kategoriBuku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const httpKategoriBukuList = () => {
    setKategoriBukuValidations({})
    kategoriBuku.http.list.execute({...params, valueFirst: searchKategoriBukuRef.current.value || ""}).then((response) => {
      const {content, searchParam, ...sisa} = response.data.data;
      setSearchParams(searchParam);//gak perlu dirubah
      setParams({...params})//gak perlu dirubah
      searchKategoriBukuRef.current.value = sisa.valueFirst;
      setPaging(sisa);
      kategoriBuku.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
    }).catch((error) => {
      // console.log("uuu error", error);
    })
  }

  const httpKategoriBukuCreate = () => {
    setKategoriBukuValidations({})
    kategoriBuku.http.create.execute(kategoriBuku.reducer.objects.state).then((response) => {
      kategoriBuku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpKategoriBukuList();
    }).catch((error) => {
      setKategoriBukuValidations(validationGrup(error))
      // console.log(error);
    })
  }

  const httpKategoriBukuUpdate = () => {
    setKategoriBukuValidations({})
    const {idKategoriBuku, ...payload} = kategoriBuku.reducer.objects.state
    kategoriBuku.http.update.execute({...payload}, idKategoriBuku).then((response) => {
      kategoriBuku.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: kategoriBuku.reducer.objects.state, key: "idKategoriBuku"})
      kategoriBuku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpKategoriBukuList();
    }).catch((error) => {
      // console.log(error);
      setKategoriBukuValidations(validationGrup(error))
    })
  }

  const httpKategoriBukuDelete = () => {
    const {idKategoriBuku} = kategoriBuku.reducer.objects.state
    kategoriBuku.http.remove.execute(idKategoriBuku).then((response) => {
        httpKategoriBukuList();
      kategoriBuku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      }).catch((error) => {
        // console.log(error);
      })
  }

  useEffect(() => {
    httpKategoriBukuList()
  }, [params.page])

const selectKategoriBuku = (data) => {
  kategoriBuku.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
}

const onKategoriBukuNext = () => {
  if (params.page < paging.totalPages) {
    console.log("lolos")
    setParams({...params, page: params.page + 1});
  } 
}

const onKategoriBukuPrevious = () => {
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
                  <Form.Label>Nama Kategori Buku</Form.Label>
                  <Form.Control 
                    placeholder="Nama Kategori Buku"
                    name={"namaKategoriBuku"}
                    onChange={handleChange}
                    value={kategoriBuku.reducer.objects.state.namaKategoriBuku || ""}
                  />
                  {kategoriBukuValidations.namaKategoriBuku && (
                      <ul className="list-unstyled">
                        {kategoriBukuValidations.namaKategoriBuku.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group >
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button variant="outline-primary" onClick={() => {
                    kategoriBuku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
                    setKategoriBukuValidations({})
                  }}>
                    Clear
                  </Button>
                  {kategoriBuku.reducer.objects.state.idKategoriBuku ? (
                    <>
                        <Button variant="outline-primary" onClick={httpKategoriBukuDelete}>Delete</Button>
                        <Button onClick={httpKategoriBukuUpdate}>Update</Button>
                    </>
                  ) : (
                    <Button onClick={httpKategoriBukuCreate}>Submit</Button>
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
                <Card.Title>Kategori Buku</Card.Title>
                {/*{JSON.stringify(searchParams)}*/}
                {/*
                {JSON.stringify(params)} */}
                <InputGroup className="w-70">
                  <Form.Select onChange={(e) => {
                    searchKategoriBukuRef.current.value = ""
                    setParams({...params, columnFirst: e.target.value});
                  }}>
                    {!params.columnFirst && (
                      <option>Pilih ...</option>
                    )}
                    {searchParams.map((val, index) => (
                      <option key={index} value={val.key}>{val.label}</option>
                    ))}
                  </Form.Select>
                  <Form.Control ref={searchKategoriBukuRef} />
                  <Button onClick={httpKategoriBukuList}>Search</Button>
                </InputGroup>
              </Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Kategori Buku</th>
                  </tr>
                </thead>
                <tbody>
                  {kategoriBuku.reducer.list.state.map((value) => (
                    <tr key={value.idKategoriBuku} onClick={() => selectKategoriBuku(value)}>
                      <td>{value.idKategoriBuku}</td>
                      <td>{value.namaKategoriBuku}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button disabled={params.page <= 0} onClick={onKategoriBukuPrevious}>Prev</Button>
                  <Button disabled={params.page >= paging.totalPages - 1} onClick={onKategoriBukuNext}>Next</Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageKategoriBukuList;