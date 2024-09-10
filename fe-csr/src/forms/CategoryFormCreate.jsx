import {useContext, useEffect, useMemo, useRef} from "react";
import {Card, Col, Container, Form, Row, Table, Button, ButtonGroup, InputGroup} from "react-bootstrap";
import ContextGeneric from "../contexts/ContextGeneric.jsx";
import {REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS} from "../config/constants.js";

const CategoryFormCreate = () => {
  const { categories } = useContext(ContextGeneric);
  const searchCategoryRef = useRef({value: ""});

  const handleChangeCategory = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = {[name]: value}
    categories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data});
  }

  const categoryList = (page, search, filters) => {
    categories.http.list.execute(page, search, filters)
      .then((data) => {
        categories.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: data.results});
        categories.reducer.pagination.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: data.pagination})
      }).catch((error) => {
        console.log(error)
    })
  }

  const nextCategory = () => {
    categoryList(categories.reducer.pagination.state.next, null, null);
  }

  const categoryHasNext = categories.reducer.pagination.state.next && true;

  const previousCategory = () => {
    categoryList(categories.reducer.pagination.state.previous, null, null);
  }

  const categoryHasPrevious = categories.reducer.pagination.state.previous && true;

  const searchCategory = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      categoryList(null, searchCategoryRef.current.value, null);
    }
  }

  const saveCategory = () => {
    categories.http.create.execute(categories.reducer.objects.state)
      .then((data) => {
        categories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
        categories.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.PUSH, data})
      }).catch((error) => {
        console.log(error);
      })
  }

  const updateCategory = () => {
    const {id, ...payload} = categories.reducer.objects.state
    categories.http.update.execute(payload, id)
      .then((data) => {
        categories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
        categories.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data})
      }).catch((error) => {
        console.log(error)
    })
  }

  const removeCategory = () => {
    const {id} = categories.reducer.objects.state
    categories.http.remove.execute(id)
      .then(() => {
        categoryList()
        categories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
      }).catch((error) => {
        console.log(error)
    })
  }

  const selectCategory = (data) => {
    categories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data})
  }

  const cancelCategory = () => {
    categories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
  }

  useEffect(() => {
    categoryList(null, null, null)
  }, []);

  return (
    <>
      <Container>
        <Row className={"mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Induk</Card.Title>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Nama Induk</Form.Label>
                    <Form.Control
                      name={"name"}
                      value={categories.reducer.objects.state.name || ""}
                      onChange={handleChangeCategory}
                      placeholder={"Masukan nama induk..."}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Sumber Dana</Form.Label>
                    <Form.Control
                      name={"funding_source"}
                      value={categories.reducer.objects.state.funding_source || ""}
                      onChange={handleChangeCategory}
                      placeholder={"Masukan sumber dana..."}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
              <Card.Footer className={"d-flex justify-content-end gap-2"}>
                {categories.reducer.objects.state.id ? (
                  <ButtonGroup>
                    <Button onClick={removeCategory} variant={"outline-primary"}>Hapus</Button>
                    <Button onClick={updateCategory}>Simpan</Button>
                    <Button onClick={cancelCategory}>Batal</Button>
                  </ButtonGroup>
                ) : (
                  <Button onClick={saveCategory}>Simpan</Button>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header className={"d-flex justify-content-end gap-2"}>
                <InputGroup className={"w-50"}>
                  <Form.Control
                    ref={searchCategoryRef}
                    onKeyDownCapture={searchCategory}
                    placeholder={"Cari ..."}
                  />
                </InputGroup>
                <ButtonGroup>
                  <Button
                    disabled={!categoryHasPrevious}
                    onClick={previousCategory}
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    disabled={!categoryHasNext}
                    onClick={nextCategory}
                  >Berikutnya</Button>
                </ButtonGroup>
              </Card.Header>
              <Table responsive={true} borderless={true} striped={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Sumber Dana</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.reducer.list.state.map((value) => (
                    <tr key={value.id} onClick={() => selectCategory(value)}>
                      <td>{value.id}</td>
                      <td>{value.name}</td>
                      <td>{value.funding_source}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CategoryFormCreate;