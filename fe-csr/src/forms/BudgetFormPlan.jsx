import {Button, ButtonGroup, Card, Col, Container, Dropdown, Form, Row, Table} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import ContextGeneric from "../contexts/ContextGeneric.jsx";
import {
  REDUCER_LIST_ACTIONS,
  REDUCER_OBJECT_ACTIONS,
  STATUS_CHOICE_VALUE_PLAN,
  STATUS_CHOICE_VALUE_USED
} from "../config/constants.js";
import ContextPagination from "../contexts/ContextPagination.jsx";
import ComponentPagination from "../components/ComponentPagination.jsx";

const BudgetFormPlan = () => {
  const [qparam] = useSearchParams();
  const navigate = useNavigate();
  const { budgets, items } = useContext(ContextGeneric);

  const init = () => {
    budgets.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
    budgets.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.EMPTY})
    items.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.EMPTY});
    items.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
  }

  const httpBudgetList = (page, search) => {
    budgets.http.list.execute(
        page,
        search,
      {is_plan: true}
      ).then((data) => {
        budgets.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: data.results});
        budgets.reducer.pagination.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: data.pagination})
      }).catch((error) => {
        console.log(error);
      })
  }

  const httpBudgetDetail = (id) => {
    budgets.http.detail.execute(id).then((data) => {
      if (data.status !== STATUS_CHOICE_VALUE_PLAN) {
        init();
      } else {
        httpItemList(null, null, {budget: qparam.get("budget")})
        budgets.reducer.objects.dispatch({ type: REDUCER_OBJECT_ACTIONS.SET, data })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const httpItemList = (page, search, filters) => {
    items.http.list.execute(
        page,
        search,
        filters
      ).then((data) => {
        items.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: data.results});
        items.reducer.pagination.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: data.pagination})
      }).catch((error) => {
        console.log(error);
      })
  }

  const httpBudgetCreate = () => {
    const payload = { status: STATUS_CHOICE_VALUE_PLAN, ...budgets.reducer.objects.state};
    budgets.http.create.execute(payload).then((data) => {
      budgets.reducer.objects.dispatch({ type: REDUCER_OBJECT_ACTIONS.SET, data });
      httpItemList(null, null, {budget: data.id})
    }).catch((error) => {
       console.log(error);
    })
  }

  const httpBudgetUpdate = () => {
    const {id, ...payload} = budgets.reducer.objects.state;
    budgets.http.update.execute(payload, id).then((data) => {
      budgets.reducer.objects.dispatch({ type: REDUCER_OBJECT_ACTIONS.SET, data });
    }).catch((error) => {
       console.log(error);
    })
  }

  const httpBudgetRemove = () => {
    budgets.http.remove.execute(budgets.reducer.objects.state.id).then(() => {
      budgets.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
      items.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
      navigate("/budgets");
    }).catch((error) => {
       console.log(error);
    })
  }

  const onChangeBudget = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    budgets.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value} });
  }

  const onChangeItem = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    items.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: parseInt(value.replace(/^0+/, ''))}})
  }





  const finishBudget = () => {
    budgets.http.update.execute({status: STATUS_CHOICE_VALUE_USED}, budgets.reducer.objects.state.id)
      .then(() => {
        budgets.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
        items.reducer.list.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
      }).catch((error) => {
        console.log(error);
      })
  }

  const budgetNext = () => {
    httpItemList(
      items.reducer.pagination.state.next,
      null,
      {budget: budgets.reducer.objects.state.id}
    )
  }

  const budgetPrevious = () => {
    httpItemList(
      items.reducer.pagination.state.previous,
      null,
      {budget: budgets.reducer.objects.state.id}
    )
  }

  const updateItem = (e) => {
    if (e.key === "Enter") {
      const {id, cost} = items.reducer.objects.state;
      const payload = {cost}
      items.http.update.execute(payload, id)
        .then((data) => {
          items.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data });
          items.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data})
        }).catch((error) => {
          console.log(error);
      })
    }
  }

  const back = () => {
    navigate("/budgets");
  }

  const selectItem = (data) => {
    items.reducer.objects.dispatch({ type: REDUCER_OBJECT_ACTIONS.SET, data });
  }

  const itemSelected = (data) => {
    return items.reducer.objects.state.id === data.id;
  }

  const planning = () => {
    return items.reducer.list.state.id
  }

  useEffect(() => {
    if (qparam.get("budget")) {
      httpBudgetDetail(qparam.get("budget"));
    } else {
      init();
      httpBudgetList()
    }
  }, [qparam.get("budget")])

  return (
    <>
      <Container>
        <Row className={"mb-3"}>
          <Col md={6}>
            <Card >
              <Card.Body>
                <Card.Title>Form Rencana Anggaran </Card.Title>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Nama Rencana Anggaran</Form.Label>
                    <Form.Control
                      name={"name"}
                      value={budgets.reducer.objects.state.name || ""}
                      onChange={onChangeBudget}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Tanggal Anggaran</Form.Label>
                    <Form.Control
                      name={"date"}
                      value={budgets.reducer.objects.state.date || ""}
                      onChange={onChangeBudget}
                      type={"date"}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
              <Card.Footer className={"d-flex justify-content-end gap-2"}>
                <Button variant={"warning"} title={"Rencana anggaran tersimpan yang belum diselesaikan."}>
                  Lihat RAT
                </Button>
                {budgets.reducer.objects.state.id ? (
                  <>
                    <ButtonGroup>
                      <Button onClick={finishBudget}>
                        Selesai
                      </Button>
                    </ButtonGroup>
                    <Dropdown>
                      <Dropdown.Toggle>Detail</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={httpBudgetUpdate}>
                          Update Anggaran
                        </Dropdown.Item>
                        <Dropdown.Item onClick={httpBudgetCreate}>
                          Rencana Anggaran Baru
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={httpBudgetRemove}>
                          Batalkan
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <Button onClick={httpBudgetCreate} >
                    Rencanakan
                  </Button>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card >
              <Card.Header className={"d-flex justify-content-end"}>
                <ContextPagination.Provider value={[items.reducer.pagination.state, budgetNext, budgetPrevious]}>
                  <ComponentPagination />
                </ContextPagination.Provider>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  Rencana Biaya Anggaran
                </Card.Title>
              </Card.Body>
              <Table borderless={true} striped={true} responsive={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Induk</th>
                    <th>Sumber Dana</th>
                    <th>Detail Deskripsi</th>
                    <th>Rencana Biaya</th>
                  </tr>
                </thead>
                <tbody>
                  {items.reducer.list.state.map((value) => (
                    <tr key={value.id} onClick={() => selectItem(value)}>
                      <td>{value.id}</td>
                      <td>{value.category_name}</td>
                      <td>{value.category_funding_source}</td>
                      <td>{value.requirement_description}</td>
                        {itemSelected(value) ? (
                          <td>
                            <Form.Group>
                              <Form.Control
                                name={"cost"}
                                value={items.reducer.objects.state.cost.toString().replace(/^0+/, '')}
                                onChange={onChangeItem}
                                onKeyDown={updateItem}
                                autoFocus={true}
                                type={"number"}
                              />
                            </Form.Group>
                          </td>
                        ) : (
                          <td>{value.cost}</td>
                        )}
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

export default BudgetFormPlan;