import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext} from "react";
import {REDUCER_OBJECT_ACTIONS, ROOT_PAGE, TOKEN_KEY, TOKEN_RESOURCE, TOKEN_RESOURCES} from "../../config/constants.js";
import ContextValidation from "../../contexts/ContextValidation.jsx";
import ComponentValidation from "../../components/ComponentValidation.jsx";
import ContextGeneric from "../../contexts/ContextGeneric.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const PageForgotPwd = () => {
  const navigate = useNavigate();

  const { forgotpwd, users } = useContext(ContextGeneric);
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    users.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  //state untuk get data
  // dispatch untuk set data ataupun clear data
  const sendMail = () => {
    const {email} = users.reducer.objects.state
    const url = "http://localhost:8080/api/auth01/forgotpwd/v1"
    
    axios.post(url, null, {
      params: {email}
    }).then((response) => {
      console.log("Ini berhasil", response);
          navigate("/verifyforgotpwd");
    }).catch((error) => {
      console.log("Error", error);
    })
    // forgotpwd.http.crea{params}ute(null,{email})//cara untuk mengirim dari query param saja
    //   .then((response) => {
    //     navigate("/verifyforgotpwd");
    //   }).catch((error) => {
    //     console.log(error)
    // })
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col md={4}>
          <Card className="shadow rounded-4">
            <Card.Body>
              {/* {JSON.stringify(users.reducer.objects.state)} */}
              <Card.Title className="fs-4 mb-3">Input Email</Card.Title>
              <Form.Group className={"mb-3"}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder={"Enter your email"}
                  name={"email"}
                  size="lg"
                  onChange={handleChange}
                  value={users.reducer.objects.state.email || ""}
                />
              </Form.Group>              
              
              
              <div className="d-grid gap-2 mt-2">
                <Button className="shadow rounded-4" size="lg" onClick={sendMail} variant="dark" >
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
export default PageForgotPwd;