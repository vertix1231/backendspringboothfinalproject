import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext} from "react";
import {REDUCER_OBJECT_ACTIONS, ROOT_PAGE, TOKEN_KEY, TOKEN_RESOURCE, TOKEN_RESOURCES} from "../config/constants.js";
import ContextValidation from "../contexts/ContextValidation.jsx";
import ComponentValidation from "../components/ComponentValidation.jsx";
import ContextGeneric from "../contexts/ContextGeneric.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const SigninForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { users } = useContext(ContextGeneric);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    users.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const signin = () => {
    users.http.create.execute(users.reducer.objects.state)
      .then((data) => {
        if (TOKEN_RESOURCE === TOKEN_RESOURCES.SESSION_STORAGE) {
          sessionStorage.setItem(TOKEN_KEY, data.access);
        } else if (TOKEN_RESOURCE === TOKEN_RESOURCES.LOCAL_STORAGE) {
          localStorage.setItem(TOKEN_KEY, data.access);
        }

        /**
         * For reduce latency when rerading token in storage
         * @type {number}
         */
        const timer = setTimeout(() => {
          navigate(state.path || ROOT_PAGE);
          clearTimeout(timer);
        }, 1500)
      }).catch((error) => {
        console.log(error)
    })
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="fs-4 mb-3">Sign In</Card.Title>
              <Form.Group className={"mb-3"}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder={"Enter your username"}
                  name={"username"}
                  onChange={handleChange}
                  value={users.reducer.objects.state.username || ""}
                />
                <ContextValidation.Provider value={[
                  users.http.validator,
                  "username",
                ]}>
                  <ComponentValidation />
                </ContextValidation.Provider>
              </Form.Group>
              <Form.Group className={"mb-3"}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder={"Enter your username"}
                  type={"password"}
                  name={"password"}
                  onChange={handleChange}
                  value={users.reducer.objects.state.password || ""}
                />
                <ContextValidation.Provider value={[
                  users.http.validator,
                  "password",
                ]}>
                  <ComponentValidation />
                </ContextValidation.Provider>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button onClick={signin} variant="primary" >
                  Sign In
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SigninForm;