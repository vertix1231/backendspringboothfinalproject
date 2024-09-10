import { useContext, useEffect, useState, useRef } from "react"
import ContextGeneric from "../../contexts/ContextGeneric"
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup } from "react-bootstrap"
import ComponentNavbar from "../../components/ComponentNavbar"
import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants"
import useValidationGroup from "../../hooks/useValidationGroup.jsx";


const PageItemList = () => {
  const { item } = useContext(ContextGeneric)
  const [searchParams, setSearchParams] = useState([]);
  const [itemValidations, setItemValidations] = useState({});
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

  const searchItemRef = useRef({value: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    item.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const httpItemList = () => {
    setItemValidations({})
    item.http.list.execute({...params, valueFirst: searchItemRef.current.value || ""}).then((response) => {
      const {content, searchParam, ...sisa} = response.data.data;
      console.log("searchParam", searchParam);
      console.log("sisa", sisa);
      setSearchParams(searchParam);
      setParams({...params})
      searchItemRef.current.value = sisa.valueFirst;
      setPaging(sisa);
      item.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
    }).catch((error) => {
    })
  }

  const httpItemCreate = () => {
    setItemValidations({})
    item.http.create.execute(item.reducer.objects.state).then((response) => {
      item.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpItemList();
    }).catch((error) => {
      setItemValidations(validationGrup(error))
      // console.log(error);
    })
  }

  const httpItemUpdate = () => {
    setItemValidations({})
    const {idItem, ...payload} = item.reducer.objects.state
    item.http.update.execute({...payload}, idItem).then((response) => {
      item.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: item.reducer.objects.state, key: "idItem"})
      item.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpItemList();

    }).catch((error) => {
      // console.log(error);
      setItemValidations(validationGrup(error))
    })
  }

  const httpItemDelete = () => {
    const {idItem: idItem} = item.reducer.objects.state
      item.http.remove.execute(idItem).then((response) => {
        httpItemList();
        item.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      }).catch((error) => {
        // console.log(error);
      })
  }

  useEffect(() => {
    httpItemList()
  }, [params.page])

const selectItem = (data) => {
  item.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
}

const onItemNext = () => {
  if (params.page < paging.totalPages) {
    console.log("lolos")
    setParams({...params, page: params.page + 1});
  } 
}

const onItemPrevious = () => {
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
                  <Form.Label>Nama Item</Form.Label>
                  <Form.Control 
                    placeholder="Nama"
                    name={"namaItem"}
                    onChange={handleChange}
                    value={item.reducer.objects.state.namaItem || ""}
                  />
                  {itemValidations.namaItem && (
                      <ul className="list-unstyled">
                        {itemValidations.namaItem.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group >
                <Form.Group className="mb-3">
                  <Form.Label>STOK</Form.Label>
                  <Form.Control
                      placeholder="Stok"
                      name={"stock"}
                      type="number"
                      maxLength="4"
                      onChange={handleChange}
                      value={item.reducer.objects.state.stock || ""}
                  />
                  {itemValidations.stock && (
                      <ul className="list-unstyled">
                        {itemValidations.stock.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group >
                <Form.Group className="mb-3">
                  <Form.Label>Harga Per Unit</Form.Label>
                  <Form.Control
                      placeholder="Harga Per Item"
                      name={"hargaPerUnit"}
                      type="number"
                      maxLength="6"
                      onChange={handleChange}
                      value={item.reducer.objects.state.hargaPerUnit || ""}
                  />
                  {itemValidations.hargaPerUnit && (
                      <ul className="list-unstyled">
                        {itemValidations.hargaPerUnit.map((value, index) => (
                            <li key={index} className="text-danger text-lowercase">{value.message}</li>
                        ))}
                      </ul>
                  )}
                </Form.Group >
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button variant="outline-primary" onClick={() => {
                    item.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
                    setItemValidations({})
                  }}>
                    Clear
                  </Button>
                  {item.reducer.objects.state.idItem ? (
                    <>
                        <Button variant="outline-primary" onClick={httpItemDelete}>Delete</Button>
                        <Button onClick={httpItemUpdate}>Update</Button>
                    </>
                  ) : (
                    <Button onClick={httpItemCreate}>Submit</Button>
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
                <Card.Title>Item</Card.Title>
                <InputGroup className="w-70">
                  <Form.Select onChange={(e) => {
                    searchItemRef.current.value = ""
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
                  <Form.Control ref={searchItemRef} />
                  <Button onClick={httpItemList}>Search</Button>
                </InputGroup>
              </Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Item</th>
                    <th>Harga Satuan</th>
                    <th>Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
                  {item.reducer.list.state.map((value) => (
                    <tr key={value.idItem} onClick={() => selectItem(value)}>
                      <td>{value.idItem}</td>
                      <td>{value.namaItem}</td>
                      <td>{value.hargaPerUnit}</td>
                      <td>{value.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button disabled={params.page <= 0} onClick={onItemPrevious}>Prev</Button>
                  <Button disabled={params.page >= paging.totalPages - 1} onClick={onItemNext}>Next</Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageItemList;