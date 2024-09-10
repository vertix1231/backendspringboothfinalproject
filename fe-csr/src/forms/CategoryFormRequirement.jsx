import {useContext, useEffect, useRef} from "react";
import {Button, ButtonGroup, Card, Col, Container, Form, InputGroup, Row, Table} from "react-bootstrap";
import ContextGeneric from "../contexts/ContextGeneric.jsx";
import {REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS, STATUS_CHOICE_VALUE_USED} from "../config/constants.js";

const CategoryFormRequirement = () => {
  const { categories, requirements } = useContext(ContextGeneric);
  const searchCategoryRef = useRef({value: ""});
  const searchRequirementRef = useRef({value: ""});

  const categoryList = (page, search, filters) => {
    categories.http.list.execute(page, search, filters)
      .then((data) => {
        categories.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: data.results});
        categories.reducer.pagination.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: data.pagination})
      }).catch((error) => {
        console.log(error)
      })
  }

  const requirementList = (page, search, filters) => {
    requirements.http.list.execute(page, search, filters)
      .then((data) => {
        requirements.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT,data: data.results});
        requirements.reducer.pagination.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: data.pagination})
      }).catch((error) => {
        console.log(error);
      })
  }

  const createRequirement = (e) => {
    if (e.key === 'Enter') {
      const payload = {
        category: categories.reducer.objects.state.id,
        ...requirements.reducer.objects.state
      }
      requirements.http.create.execute(payload)
        .then(() => {
          requirements.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
          requirementList(null, null, {category: categories.reducer.objects.state.id})
        }).catch((error) => {
          console.log(error);
      })
    }
  }

  const updateRequirement = (e) => {
    if (e.key === 'Enter') {
      const {id, ...payload} = requirements.reducer.objects.state
      requirements.http.update.execute(payload, id)
        .then((data) => {
          requirements.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
          requirements.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data})
        }).catch((error) => {
          console.log(error);
      })
    }
  }

  const removeRequirement = () => {
    const { id } = requirements.reducer.objects.state
      requirements.http.remove.execute(id)
        .then(() => {
          requirements.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
          requirementList(null, null, {category: categories.reducer.objects.state.id})
        }).catch((error) => {
          console.log(error);
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

  const selectCategory = (data) => {
    categories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data});
    requirements.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
    requirementList(null, null, {category: data.id});
  }

  const categorySelected = !!categories.reducer.objects.state.id

  const handleRequirementChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    requirements.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const selectRequirement = (data) => {
    requirements.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data})
  }

  const nextRequirement = () => {
    requirementList(requirements.reducer.pagination.state.next, null, null);
  }

  const requirementHasNext = requirements.reducer.pagination.state.next && true;

  const previousRequirement = () => {
    requirementList(requirements.reducer.pagination.state.previous, null, null);
  }

  const requirementHasPrevious = requirements.reducer.pagination.state.previous && true;

  const searchRequirement = (e) => {
    if (e.key === "Enter") {
      requirementList(null, searchRequirementRef.current.value, {category: categories.reducer.objects.state.id});
    }
  }

  useEffect(() => {
    categoryList(null, null, null)
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Header className={"d-flex justify-content-end gap-2"}>
                <InputGroup className={"w-100"}>
                  <Form.Control
                    ref={searchCategoryRef}
                    onKeyDownCapture={searchCategory}
                    placeholder={"Search ..."}
                  />
                  <Button onClick={searchCategory}>Search</Button>
                </InputGroup>
                <ButtonGroup>
                  <Button
                    disabled={!categoryHasPrevious}
                    onClick={previousCategory}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={!categoryHasNext}
                    onClick={nextCategory}
                  >Next</Button>
                </ButtonGroup>
              </Card.Header>
              <Card.Body>
                <Card.Title>Categories</Card.Title>
              </Card.Body>
              <Table responsive={true} borderless={true} striped={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Funding Source</th>
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
            <Col md={8}>
              <Card>
                <Card.Header className={"d-flex justify-content-end gap-2"}>
                  <InputGroup className={"w-100"}>
                    <Form.Control
                      ref={searchRequirementRef}
                      onKeyDownCapture={searchRequirement}
                      placeholder={"Search ..."}
                    />
                  </InputGroup>
                  <ButtonGroup>
                    <Button
                      disabled={!requirementHasPrevious}
                      onClick={previousRequirement}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={!requirementHasNext}
                      onClick={nextRequirement}
                    >Next</Button>
                  </ButtonGroup>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Requirement</Card.Title>
                </Card.Body>
                <Table responsive={true} striped={true} borderless={true}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.reducer.objects.state.id && (
                      <tr>
                        <td>Generate by system.</td>
                        <td>
                          <InputGroup>
                            <Form.Control
                              placeholder={`Enter your description by '${categories.reducer.objects.state.name}' category ...`}
                              name={"description"}
                              value={requirements.reducer.objects.state.description || ""}
                              onChange={handleRequirementChange}
                              onKeyDownCapture={requirements.reducer.objects.state.id ? updateRequirement : createRequirement}
                            />
                            {requirements.reducer.objects.state.id && (
                              <Button variant={"outline-secondary"} onClick={removeRequirement}>Remove</Button>
                            )}
                          </InputGroup>
                          <Form.Text>Press <b>Enter</b> in your keyboard to save/update requirement.</Form.Text>
                        </td>
                      </tr>
                    )}
                  {requirements.reducer.list.state.map((value) => (
                    <tr key={value.id} onClick={() => selectRequirement(value)}>
                      <td>{value.id}</td>
                      <td>{value.description}</td>
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

export default CategoryFormRequirement;