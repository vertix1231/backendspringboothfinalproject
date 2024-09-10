import {useContext, useEffect} from "react";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import ContextGeneric from "../contexts/ContextGeneric.jsx";
import {REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS, STATUS_CHOICE_VALUE_USED} from "../config/constants.js";

const BudgetFormUsed = () => {
  const location = useLocation();
  const { budgets, budgetCategories, items, services } = useContext(ContextGeneric);

  console.log(services.localization.date)
  useEffect(() => {
    budgetCategories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
    budgetCategories.reducer.list.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
    budgets.reducer.list.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
    items.reducer.list.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY});
    budgetList(null, null, { is_plan: false })
  }, [location.pathname])

  const budgetList = (page, search, filters) => {
    filters = {...filters, ...{ status: STATUS_CHOICE_VALUE_USED }}
    budgets.http.list.execute(page, search, filters)
      .then((data) => {
        budgets.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: data.results});
      }).catch((error) => {
        console.log(error);
      })
  }

  const categoryList = (page, search, filters) => {
    budgetCategories.http.list.execute(page, search, filters)
      .then((data) => {
        budgetCategories.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: data.results});
      }).catch((error) => {
        console.log(error);
      })
  }

  const itemList = (page, search, filters) => {
    items.http.list.execute(page, search, filters)
    .then((data) => {
      items.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: data.results});
    }).catch((error) => {
      console.log(error);
    })
  }

  const selectBudget = (data) => {
    budgetCategories.reducer.list.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
    items.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.EMPTY})
    budgets.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data})
    categoryList(null, null, {budget: data.id});
    itemList(null, null, {budget: data.id})
  }

  const selectCategory = (data) => {
    budgetCategories.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data})
    itemList(null, null, {
      budget: budgets.reducer.objects.state.id,
      requirement__category: data.category
    })
  }

  const handleItemUsed = (e) => {
    const value = parseInt(e.target.value.replace(/^0+/, ''));
    items.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {used: value}})
  }

  const selectItem = (data) => {
    items.reducer.objects.dispatch({ type: REDUCER_OBJECT_ACTIONS.SET, data });
  }

  const itemSelected = (data) => {
    return items.reducer.objects.state.id === data.id;
  }

  const updateItem = (e) => {
    if (e.key === "Enter") {
      const {id, used} = items.reducer.objects.state;
      const payload = {used}
      items.http.update.execute(payload, id)
        .then((data) => {
          items.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data})
          items.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
        }).catch((error) => {
          console.log(error);
      })
    }
  }

  return (
    <>
      <Container>
        <Row  className={"mt-3"}>
          <Col md={4} >
            <Card>
              <Card.Body>
                <Card.Title>Budget</Card.Title>
                <Form.Group>
                  <Form.Label>Choose Budget</Form.Label>
                  <Form.Select multiple={true}>
                    {budgets.reducer.list.state.map((value) => (
                      <option onClick={() => selectBudget(value)} value={value.id} key={value.id}>
                        {value.name} / {services.localization.date.format(value.date)} / {value.is_plan && "true"}
                      </option>
                    ))}
                    <option>
                      more
                    </option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Categories</Card.Title>
                <Form.Group>
                  <Form.Label>Choose Category</Form.Label>
                  <Form.Select multiple={true}>
                    {budgetCategories.reducer.list.state.map((value) => (
                      <option onClick={() => selectCategory(value)} value={value.id} key={value.id}>
                        {value.category_name} / {value.category_funding_source}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} >
            <Card>
              <Table responsive={true} borderless={true}>
                <tbody>
                  <tr>
                    <th>Category / Root</th>
                    <td>{budgetCategories.reducer.objects.state.category_name}</td>
                  </tr>
                  <tr>
                    <th>Funding Source</th>
                    <td>{budgetCategories.reducer.objects.state.category_funding_source}</td>
                  </tr>
                </tbody>
              </Table>
              <Card.Footer className={"d-flex justify-content-end pt-4"}>
                <div className={"fw-medium text-primary display-6 text-truncate"}>
                  {services.localization.currency.format(budgetCategories.reducer.objects.state.total || 0)}
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row className={"mt-4"}>
          <Col>
            <Card >
              <Card.Body>
                <Card.Title>Item Plan</Card.Title>
              </Card.Body>
              <Table borderless={true} responsive={true} striped={true} hover={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Induk</th>
                    <th>Sumber Dana</th>
                    <th>Detail Deskripsi</th>
                    <th>Kebutuhan</th>
                    <th>Digunakan</th>
                    <th>Saldo</th>
                    <th>Kurang</th>
                  </tr>
                </thead>
                <tbody>
                  {items.reducer.list.state.map((value) => (
                    <tr key={value.id} onClick={() => selectItem(value)}>
                      <td>{value.id}</td>
                      <td>{value.category_name}</td>
                      <td>{value.category_funding_source}</td>
                      <td>{value.requirement_description}</td>
                      <td>{services.localization.currency.format(value.cost)}</td>
                      {items.reducer.objects.state.id === value.id ? (
                        <td>
                          <Form.Group>
                            <Form.Control
                              value={items.reducer.objects.state.used.toString().replace(/^0+/, '')}
                              onChange={handleItemUsed}
                              onKeyDown={updateItem}
                              autoFocus={true}
                              onBlur={() => items.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})}
                              type={"number"}
                            />
                            <Form.Text className={"mt-4"}>
                              {services.localization.currency.format(items.reducer.objects.state.used)}
                            </Form.Text>
                          </Form.Group>
                          </td>
                        ) : (
                          <td>{services.localization.currency.format(value.used)}</td>
                        )}
                      <td>{services.localization.currency.format(value.balance)}</td>
                      <td>{services.localization.currency.format(value.remaining)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {items.reducer.list.state.length > 0 && (
                <Card.Footer className={"d-flex justify-content-end"}>
                  <Button>Simpan</Button>
                </Card.Footer>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default BudgetFormUsed;