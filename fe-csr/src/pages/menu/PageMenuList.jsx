import { useContext, useEffect, useState, useRef } from "react"
import ContextGeneric from "../../contexts/ContextGeneric"
import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup, Dropdown } from "react-bootstrap"
import ComponentNavbar from "../../components/ComponentNavbar"
import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants"
import useValidationGroup from "../../hooks/useValidationGroup.jsx";

const menuInit = {namaMenu: null, pathMenu: null, endPoint: null, menuHeader: null}

const PageMenuList = () => {
  const { menu } = useContext(ContextGeneric)
  const [searchParams, setSearchParams] = useState([]);
  const [menuValidations, setMenuValidations] = useState({});
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

  const searchMenuRef = useRef({value: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    menu.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const httpMenuList = () => {
    setMenuValidations({})
    menu.http.list.execute({...params, valueFirst: searchMenuRef.current.value || ""}).then((response) => {
      const {content, searchParam, listGroup, ...sisa} = response.data.data;
      console.log("searchParam", searchParam);
      console.log("sisa", sisa);
      setSearchParams(searchParam);
      setParams({...params})
      searchMenuRef.current.value = sisa.valueFirst;
      setPaging(sisa);

      menu.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
      menu.reducer.objects.dispatch({
        type: REDUCER_OBJECT_ACTIONS.SET,
        data: {listGroup: [...listGroup]}
      })
    }).catch((error) => {
      menu.reducer.objects.dispatch({
        type: REDUCER_OBJECT_ACTIONS.SET,
        data: {listGroup: error.data.listGroup}
      })
    })
  }

  const httpMenuCreate = () => {
    setMenuValidations({})
    const {listGroup, ...payload} = menu.reducer.objects.state
    menu.http.create.execute(payload).then((response) => {
      menu.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpMenuList();
    }).catch((error) => {
      // menu.reducer.objects.dispatch({
      //   type: REDUCER_OBJECT_ACTIONS.SET,
      //   data: {listGroup: error.data.listGroup}
      // })

      setMenuValidations(validationGrup(error))
      // console.log(validationGrup(error))
    })
  }

  const httpMenuUpdate = () => {
    setMenuValidations({})
    const {idMenu, listGroup, ...payload} = menu.reducer.objects.state
    menu.http.update.execute({...payload}, idMenu).then((response) => {
      menu.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: menu.reducer.objects.state, key: "idMenu"})
      menu.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      httpMenuList();
    }).catch((error) => {
      // console.log(error);
      setMenuValidations(validationGrup(error))
    })
  }

  const httpMenuDelete = () => {
    const {idMenu} = menu.reducer.objects.state
    menu.http.remove.execute(idMenu).then((response) => {
        
        menu.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
        httpMenuList();
      }).catch((error) => {
        // console.log(error);
      })
  }

  useEffect(() => {
    httpMenuList()  
    menu.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, 
    data: menuInit
  })
  }, [params.page])

const selectMenu = (data) => {
  menu.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
}

const onMenuNext = () => {
  if (params.page < paging.totalPages) {
    setParams({...params, page: params.page + 1});
  }
}

const onMenuPrevious = () => {
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
              {/* {JSON.stringify(menu.reducer.objects.state)} */}
              <Card.Body className="">
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control 
                    placeholder="Nama"
                    name={"namaMenu"}
                    // isInvalid={menuValidations.namaMenu?.length}
                    // isValid={menuValidations.namaMenu?.length > 0}
                    onChange={handleChange}
                    value={menu.reducer.objects.state.namaMenu || ""}
                  />
                  {menuValidations.namaMenu && (
                    <ul className="list-unstyled">
                      {menuValidations.namaMenu.map((value, index) => (
                        <li key={index} className="text-danger text-lowercase">{value.message}</li>
                      ))}
                    </ul>
                  )}
                </Form.Group >
                <Form.Group>
                <Form.Label>Path</Form.Label>
                  <Form.Control 
                    placeholder="Path"
                    name={"pathMenu"}
                    onChange={handleChange}
                    value={menu.reducer.objects.state.pathMenu || ""}
                  />
                  {menuValidations.pathMenu && (
                    <ul className="list-unstyled">
                      {menuValidations.pathMenu.map((value, index) => (
                        <li key={index} className="text-danger text-lowercase">{value.message}</li>
                      ))}
                    </ul>
                  )}
                </Form.Group>
                <Form.Group className={"vw-100 mb-3 mt-3"}>
                  <Form.Label>Groups</Form.Label>
                  <div className="d-grid gap-2">
                  <Dropdown className={"w-100 mb-3 mt-3"} >
                    <Dropdown.Toggle variant={"success"} id="dropdown-basic">
                      {menu.reducer.objects.state.menuHeader?.namaMenuHeader ? menu.reducer.objects.state.menuHeader?.namaMenuHeader : "Pilih"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {menu.reducer.objects.state.listGroup && menu.reducer.objects.state.listGroup.map((value) => (
                        <Dropdown.Item 
                        active={value.idMenuHeader === menu.reducer.objects.state.menuHeader?.idMenuHeader}
                        key={value.idMenuHeader}
                        onClick={(e) => {
                          menu.reducer.objects.dispatch({
                            type: REDUCER_OBJECT_ACTIONS.SET,
                            data: {menuHeader: value}, 
                          })
                        }}>{value.namaMenuHeader}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  </div>
                  {menuValidations.menuHeader && (
                    <ul className="list-unstyled">
                      {menuValidations.menuHeader.map((value, index) => (
                        <li key={index} className="text-danger text-lowercase">{value.message}</li>
                      ))}
                    </ul>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Endpoint</Form.Label>
                  <Form.Control 
                    placeholder="End Point"
                    name={"endPoint"}
                    onChange={handleChange}
                    value={menu.reducer.objects.state.endPoint || ""}
                  />
                   
                  {menuValidations.endPoint && (
                    <ul className="list-unstyled">
                      {menuValidations.endPoint.map((value, index) => (
                        <li key={index} className="text-danger text-lowercase">{value.message}</li>
                      ))}
                    </ul>
                  )}
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button variant="outline-primary" onClick={() => {
                    const listGroup = [...menu.reducer.objects.state.listGroup];
                    menu.reducer.objects.dispatch({
                      type: REDUCER_OBJECT_ACTIONS.EMPTY, 
                    })
                    menu.reducer.objects.dispatch({
                      type: REDUCER_OBJECT_ACTIONS.SET,
                      data: {listGroup}, 
                    })
                    setMenuValidations({})
                  }}>
                    Clear
                  </Button>
                  {menu.reducer.objects.state.idMenu ? (
                    <>
                        <Button variant="outline-primary" onClick={httpMenuDelete}>Delete</Button>
                        <Button onClick={httpMenuUpdate}>Update</Button>
                    </>
                  ) : (
                    <Button onClick={httpMenuCreate}>Submit</Button>
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
                <Card.Title>Menu Management</Card.Title>                
                <InputGroup className="w-30">
                  <Form.Select onChange={(e) => {
                    searchMenuRef.current.value = ""
                    setParams({...params, columnFirst: e.target.value});
                  }}>
                    {!params.columnFirst && (
                      <option>Pilih ...</option>
                    )}
                    {searchParams.map((val, index) => (
                      <option key={index} value={val.key}>{val.label}</option>
                    ))}
                  </Form.Select>                  
                  <Form.Control ref={searchMenuRef} />
                  <Button onClick={httpMenuList}>Search</Button>
                </InputGroup>
              </Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Path</th>
                    <th>Group</th>
                    <th>End Point</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
                  {menu.reducer.list.state.map((value) => (
                    <tr key={value.idMenu} onClick={() => selectMenu(value)}>
                      <td>{value.idMenu}</td>
                      <td>{value.namaMenu}</td>
                      <td>{value.pathMenu}</td>
                      <td>{value.menuHeader.namaMenuHeader}</td>
                      <td>{value.endPoint}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button disabled={params.page <= 0} onClick={onMenuPrevious}>Prev</Button>
                  <Button disabled={params.page >= paging.totalPages - 1} onClick={onMenuNext}>Next</Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageMenuList;