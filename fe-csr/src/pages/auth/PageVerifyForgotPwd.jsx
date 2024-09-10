import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext} from "react";
import {REDUCER_OBJECT_ACTIONS, ROOT_PAGE, TOKEN_KEY, TOKEN_RESOURCE, TOKEN_RESOURCES} from "../../config/constants.js";
import ContextValidation from "../../contexts/ContextValidation.jsx";
import ComponentValidation from "../../components/ComponentValidation.jsx";
import ContextGeneric from "../../contexts/ContextGeneric.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const PageVerifyForgotPwd = () => {
  const navigate = useNavigate();
  const { verifyForgotPassword, users } = useContext(ContextGeneric);
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    users.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const verifyTokenPwd = () => {
    const {password,newPassword,email,token} = users.reducer.objects.state    
    // verifyForgotPassword.http.create.execute(users.reducer.objects.state)
    verifyForgotPassword.http.create.execute({email,token})
      .then((response) => {
        //563820
        //$2a$11$FpFJZ6hzCLBti5f/VJVX.uqHdzN5RKZCwTSo7D6WfFLwAkIvWR9LW
        users.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET,data:{token:response.data.token}})
        navigate("/confirmforgotpwd")
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
              <Card.Title className="fs-4 mb-3">Input Token</Card.Title>
              <Form.Group className={"mb-3"}>
                <Form.Label>Token</Form.Label>
                <Form.Control
                  placeholder={"Enter Token From email"}
                  name={"token"}
                  size="lg"
                  type={"password"}
                  onChange={handleChange}
                  value={users.reducer.objects.state.token || ""}
                />
              </Form.Group>              
              
              <div className="d-grid gap-2 mt-2">
                <Button className="shadow rounded-4" size="lg" onClick={verifyTokenPwd} variant="dark" >
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
export default PageVerifyForgotPwd;