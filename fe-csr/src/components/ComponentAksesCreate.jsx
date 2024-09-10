import { useState } from "react";
import {Button, Modal, Form, Dropdown, Row, Col} from 'react-bootstrap';
import useHTTP from "../hookz/useHTTP.jsx";
import {BASE_URL} from "../config/constants.js";
import useMessage from "../hookz/useMessage.jsx";
import useValidator from "../hookz/useValidator.jsx";
import ComponentValidator from "./ComponentValidator.jsx";

const ComponentAksesCreate = ({ title, pListGroupMenu, pListGroupDivisi, pAkses=null }) => {

  const http = useHTTP();
  const message = useMessage();

  const [show, setShow] = useState(false);
  const [akses, setAkses] = useState({
    namaAkses: "",
    divisi: { idDivisi: null },
    listMenuAkses: []
  });
  const aksesValidator = useValidator();

  const [listGroupMenu, setListGroupMenu] = useState([]);
  const [listGroupDivisi, setListGroupDivisi] = useState([]);
  const [tempListMenuAkses, setTempListMenuAkses] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onAksesCreate = () => {
    aksesValidator.reset();
    const url = `${BASE_URL}/usrmgmnt/akses/v1`;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
      }
    }

    http.post(url, akses, config).then((response) => {
      handleClose();
      message.success(response)
    }).catch((error) => {
      message.error(error);
      aksesValidator.except(error)
      console.log(error);
    })
  }

  const onAksesUpdate = () => {
    let { idAkses,  ...payload } = akses;
    const url = `${BASE_URL}/usrmgmnt/akses/v1/${idAkses}`;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
      }
    }

    http.put(url, payload, config).then((response) => {
      // console.log(response);
      handleClose();
    }).catch((error) => {
      // console.log(error);
    })
  }

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAkses({...akses, [name]: value});
  }

  const onGroupMenuSelected = (value, status) => {
    // console.log(value, status, akses.listMenuAkses);
    if (status) {
      const {idMenu, ...sisa} = value;
      const temps = [...akses.listMenuAkses, {idMenu}]
      setAkses({...akses, listMenuAkses: temps})
    } else {
      const temps = akses.listMenuAkses.filter((obj) => value.idMenu !== obj.idMenu)
      setAkses({...akses, listMenuAkses: temps})
    }
  }

  const onDivisiSelected = (value) => {
    const {idDivisi} = value;
    setAkses({...akses, divisi: {idDivisi}});
  }

  const onMenuAksesSelectedAll = (status) => {
    if (status) {
      setTempListMenuAkses(akses.listMenuAkses);
      const temp = listGroupMenu.map((value) => ({idMenu: value.idMenu}));
      setAkses({...akses, listMenuAkses: [...temp]})
    } else {
      setAkses({...akses, listMenuAkses: [...tempListMenuAkses]})
    }
  }

  const onShow = () => {
    if (pAkses) {
      // console.log(pAkses)
      setAkses(pAkses);
    }
    setListGroupDivisi(pListGroupDivisi);
    setListGroupMenu(pListGroupMenu);
  }

  return (
      <>
        <Button variant="primary" onClick={handleShow}>
          {title}
        </Button>
        <Modal show={show} onHide={handleClose} onShow={onShow} size={"lg"}>
          <Modal.Header closeButton>
            <Modal.Title>Akses</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group className={"mb-3"}>
              <Form.Label>Nama Akses</Form.Label>
              <Form.Control name={"namaAkses"} value={akses.namaAkses || ""} onChange={onChangeHandler} />
              <ComponentValidator field={"namaAkses"} messages={aksesValidator.result()} />
            </Form.Group>
            <Form.Group className={"mb-3"}>
              <Form.Label>Divisi</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Pilih Divisi
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {listGroupDivisi.map((value, index) => (
                      <Dropdown.Item
                          onClick={(e) => onDivisiSelected(value)}
                          key={index}
                          active={akses.divisi.idDivisi === value.idDivisi}
                      >
                        {value.namaDivisi}
                      </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <ComponentValidator field={"divisi"} messages={aksesValidator.result()} />
            </Form.Group>
            <Form.Group>
              <Form.Label className={"d-flex justify-content-start gap-4"}>
                <span>Menu Akses</span>
                <Form.Check // prettier-ignore
                    type={"switch"}
                    label={`All`}
                    onChange={(e) => onMenuAksesSelectedAll(e.target.checked)}
                />
              </Form.Label>
              <Row>
                {listGroupMenu.map((value, index) => (
                    <Col md={4} key={index}>
                      <Form.Check
                          onChange={(e) => {
                            onGroupMenuSelected(value, e.target.checked);
                          }}
                          type={"switch"}
                          id={value.idMenu}
                          checked={akses.listMenuAkses.some(item => item.idMenu === value.idMenu)}
                          label={<small>{value.namaMenu}</small>} />
                    </Col>
                ))}
              </Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className={"d-flex justify-content-end"}>
            {akses.idAkses && (
                <Button onClick={onAksesUpdate}>Update</Button>
            )}
            {!akses.idAkses && (
                <Button onClick={onAksesCreate}>Submit</Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
  )
}

export default ComponentAksesCreate;