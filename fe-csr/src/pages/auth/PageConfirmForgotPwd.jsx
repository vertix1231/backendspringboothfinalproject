import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext} from "react";
import {REDUCER_OBJECT_ACTIONS, ROOT_PAGE, TOKEN_KEY, TOKEN_RESOURCE, TOKEN_RESOURCES} from "../../config/constants.js";
import ContextValidation from "../../contexts/ContextValidation.jsx";
import ComponentValidation from "../../components/ComponentValidation.jsx";
import ContextGeneric from "../../contexts/ContextGeneric.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const PageConfirmForgotPwd = () => {
  const navigate = useNavigate();

  const { confirmForgotPassword, users } = useContext(ContextGeneric);
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    users.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const confirma = () => {    
    console.log("kambing ",users.reducer.objects.state)
    confirmForgotPassword.http.create.execute(users.reducer.objects.state)
      .then((response) => {
        navigate("/")
      }).catch((error) => {
        console.log(error)
    })
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col md={4}>
          <Card className="shadow rounded-4">
            <Card.Body>
              {/* {JSON.stringify(users.reducer.objects.state)} */}
              <Card.Title className="fs-4 mb-3">Lupa Password</Card.Title>
              <Form.Group className={"mb-3"}>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  placeholder={"Enter your new Password"}
                  name={"password"}
                  type ={"password"}
                  size="lg"
                  onChange={handleChange}
                  value={users.reducer.objects.state.password || ""}
                />
              </Form.Group> 
              <Form.Group className={"mb-3"}>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  placeholder={"Confirm your new Password"}
                  name={"newPassword"}
                  type ={"password"}
                  size="lg"
                  onChange={handleChange}
                  value={users.reducer.objects.state.newPassword || ""}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-2">
                <Button className="shadow rounded-4" size="lg" onClick={confirma} variant="dark" >
                  Kirim
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

//agar bisa diimport di modul lain dan harus di daftarkan di App.jsx
export default PageConfirmForgotPwd;