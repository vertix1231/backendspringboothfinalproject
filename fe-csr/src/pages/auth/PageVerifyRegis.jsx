import {Button, Card, Col, Container, Form, Row, ButtonGroup} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {REDUCER_OBJECT_ACTIONS, ROOT_PAGE, TOKEN_KEY, TOKEN_RESOURCE, TOKEN_RESOURCES} from "../../config/constants.js";
import ContextValidation from "../../contexts/ContextValidation.jsx";
import ComponentValidation from "../../components/ComponentValidation.jsx";
import ContextGeneric from "../../contexts/ContextGeneric.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const PageVerifyRegis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("data passing: ", location.state);
  const {verifyRegis, users, newTokenRegis } = useContext(ContextGeneric);
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    users.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const onVerifyToken = () => {    
    const {token,email} = users.reducer.objects.state

    verifyRegis.http.create.execute({token, email})
      .then((response) => {
        navigate("/");
        // console.log("verify token berhasil", response)
      }).catch((error) => {
        // console.log("verify token berhasil")
    })
  }

  const onNewToken = () => {
    const { email } = users.reducer.objects.state
    newTokenRegis.http.custom.create.execute({ email, kancut: "Yuhu" })
      .then((response) => {
        console.log("onNewToken berhasil", response)
      }).catch((error) => {
        console.log(error)
    })
  }

  useEffect(() => {
    if (!users.reducer.objects.state.email) {
      navigate("/");
    }
  }, [])

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col md={3}>
          <Card>
            <Card.Body>
              {/* {JSON.stringify(users.reducer.objects.state)} */}
              <Card.Title className="fs-4 mb-3">Verify Token</Card.Title>
              <Form.Group className={"mb-3"}>
                <Form.Label>Token</Form.Label>
                <Form.Control
                  placeholder={"Input 6 Digit Token"}
                  type ={"password"}
                  name={"token"}
                  onChange={handleChange}
                  value={users.reducer.objects.state.token || ""}
                />                
              </Form.Group>              
              <div className="d-flex justify-content-end gap-2">
       
                  <Button className="w-50" variant={"outline-primary"} onClick={onNewToken}  >
                    Token Baru
                  </Button>
                  <Button className="w-50" onClick={onVerifyToken} variant="primary" >
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
export default PageVerifyRegis;