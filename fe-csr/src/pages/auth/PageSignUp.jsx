import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext} from "react";
import {REDUCER_OBJECT_ACTIONS, ROOT_PAGE, TOKEN_KEY, TOKEN_RESOURCE, TOKEN_RESOURCES} from "../../config/constants.js";
import ContextValidation from "../../contexts/ContextValidation.jsx";
import ComponentValidation from "../../components/ComponentValidation.jsx";
import ContextGeneric from "../../contexts/ContextGeneric.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const PageSignUp = () => {
  const navigate = useNavigate();
  const { doRegis, users } = useContext(ContextGeneric);
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    users.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
  }

  const signUp = () => {
    doRegis.http.create.execute(users.reducer.objects.state)
    .then((response) => {
      
      navigate("/verifyregis", {state: users.reducer.objects.state});
    }).catch((error) => {
      console.log(error)
  })
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col md={8}>
          <Card>
            <Card.Body>
              {/* {JSON.stringify(users.reducer.objects.state)} */}
              <Card.Title className="fs-4 mb-3">Registration</Card.Title>
              <Row>
                <Col>
                
                  <Form.Group className={"mb-3"}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder={"ex : pollchihuy321"}
                      name={"username"}
                      onChange={handleChange}
                      disabled={doRegis.http.create.loading.loading}
                      value={users.reducer.objects.state.username || ""}
                    />                
                  </Form.Group>
                  <Form.Group className={"mb-3"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      placeholder={"Password"}
                      type={"password"}
                      name={"password"}
                      onChange={handleChange}
                      disabled={doRegis.http.create.loading.loading}
                      value={users.reducer.objects.state.password || ""}
                    />                
                  </Form.Group>
                  <Form.Group className={"mb-3"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      placeholder={"ex : poll.chihuy@gmail.com"}
                      name={"email"}
                      onChange={handleChange}
                      disabled={doRegis.http.create.loading.loading}
                      value={users.reducer.objects.state.email || ""}
                    />                
                  </Form.Group>
                  <Form.Group className={"mb-3"}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      placeholder={"ex : 62 atau 0 - 81286016416"}
                      name={"noHp"}
                      onChange={handleChange}
                      disabled={doRegis.http.create.loading.loading}
                      value={users.reducer.objects.state.noHp || ""}
                    />
                  </Form.Group>
                </Col> 
                <Col>
                
                  <Form.Group className={"mb-3"}>
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      placeholder={"ex : Paul Christian"}
                      name={"namaLengkap"}
                      onChange={handleChange}
                      disabled={doRegis.http.create.loading.loading}
                      value={users.reducer.objects.state.namaLengkap || ""}
                    />
                  </Form.Group>
                  <Form.Group className={"mb-3"}>
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      placeholder={"min 40 max 255 karakter"}
                      name={"alamat"}
                      as = {"textarea"}
                      onChange={handleChange}
                      disabled={doRegis.http.create.loading.loading}
                      value={users.reducer.objects.state.alamat || ""}
                    />
                  </Form.Group>
                  <Form.Group className={"mb-3"}>
                    <Form.Label>Tgl Lahir</Form.Label>
                    <Form.Control
                      name={"tanggalLahir"}
                      disabled={doRegis.http.create.loading.loading}
                      type={"date"}
                      onChange={handleChange}
                      value={users.reducer.objects.state.tanggalLahir || ""}
                    />
                  </Form.Group>
                  <div className="d-grid gap-2 mt-4">
                    <Button onClick={signUp} disabled={doRegis.http.create.loading.loading} variant="primary" >
                      {doRegis.http.create.loading.loading ? "Loading..." : "Sign Up"}
                    </Button>
                  </div>
                </Col> 
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )

}

//agar bisa diimport di modul lain dan harus di daftarkan di App.jsx
export default PageSignUp;