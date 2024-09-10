import { useState } from "react";
import {Button, Modal, Form, Dropdown, Row, Col} from 'react-bootstrap';
import useHTTP from "../hookz/useHTTP.jsx";
import {BASE_URL} from "../config/constants.js";
import useMessage from "../hookz/useMessage.jsx";
import useValidator from "../hookz/useValidator.jsx";
import ComponentValidator from "./ComponentValidator.jsx";

const ComponentBukuCreate = ({ title, pListGroupPengarang, pListGroupKategoriBuku, pBuku=null }) => {

  const http = useHTTP();
  const message = useMessage();

  const [show, setShow] = useState(false);
  const [buku, setBuku] = useState({
    judulBuku: "",
    kategoriBuku: { idKategoriBuku: null },
    listGroupPengarang: []
  });
  const bukuValidator = useValidator();

  const [listGroupPengarang, setListGroupPengarang] = useState([]);
  const [listGroupKategoriBuku, setListGroupKategoriBuku] = useState([]);
  const [tempListPengarang, setTempListPengarang] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onBukuCreate = () => {
    bukuValidator.reset();
    const url = `${BASE_URL}/book/buku/v1`;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
      }
    }

    http.post(url, buku, config).then((response) => {
      handleClose();
      message.success(response)
    }).catch((error) => {
      message.error(error);
      bukuValidator.except(error)
      console.log(error);
    })
  }

  const onBukuUpdate = () => {
    let { idBuku: idBuku,  ...payload } = buku;
    const url = `${BASE_URL}/book/buku/v1/${idBuku}`;

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

    setBuku({...buku, [name]: value});
  }

  const onGroupPengarangSelected = (value, status) => {
    // console.log(value, status, buku.listGroupPengarang);
    if (status) {
      const {idPengarang, ...sisa} = value;
      const temps = [...buku.listPengarang, {idPengarang}]
      setBuku({...buku, listPengarang: temps})
    } else {
      const temps = buku.listPengarang.filter((obj) => value.idPengarang !== obj.idPengarang)
      setBuku({...buku, listPengarang: temps})
    }
  }

  const onKategoriBukuSelected = (value) => {
    const {idKategoriBuku} = value;
    setBuku({...buku, kategoriBuku: {idKategoriBuku}});
  }

  const onPengarangSelectAll = (status) => {
    if (status) {
      setTempListPengarang(buku.listPengarang);
      const temp = listGroupPengarang.map((value) => ({idPengarang: value.idPengarang}));
      setBuku({...buku, listPengarang: [...temp]})
    } else {
      setBuku({...buku, listPengarang: [...tempListPengarang]})
    }
  }

  const onShow = () => {
    if (pBuku) {
      // console.log(pBuku)
      setBuku(pBuku);
    }
    setListGroupKategoriBuku(pListGroupKategoriBuku);
    setListGroupPengarang(pListGroupPengarang);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {title}
      </Button>
      <Modal show={show} onHide={handleClose} onShow={onShow} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className={"mb-3"}>
            <Form.Label>Nama Buku</Form.Label>
            <Form.Control name={"judulBuku"} value={buku.judulBuku || ""} onChange={onChangeHandler} />
            <ComponentValidator field={"judulBuku"} messages={bukuValidator.result()} />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Kategori</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                Pilih Kategori
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {listGroupKategoriBuku.map((value, index) => (
                  <Dropdown.Item
                    onClick={(e) => onKategoriBukuSelected(value)}
                    key={index}
                    active={buku.kategoriBuku.idKategoriBuku === value.idKategoriBuku}
                  >
                    {value.namaKategoriBuku}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <ComponentValidator field={"kategoriBuku"} messages={bukuValidator.result()} />
          </Form.Group>
          <Form.Group>
            <Form.Label className={"d-flex justify-content-start gap-4"}>
              <span>Pengarang</span>
              <Form.Check // prettier-ignore
                type={"switch"}
                label={`All`}
                onChange={(e) => onPengarangSelectAll(e.target.checked)}
              />
            </Form.Label>
            <Row>
              {listGroupPengarang.map((value, index) => (
                <Col md={4} key={index}>
                  <Form.Check
                    onChange={(e) => {
                      onGroupPengarangSelected(value, e.target.checked);
                    }}
                    type={"switch"}
                    id={value.idPengarang}
                    checked={buku.listPengarang.some(item => item.idPengarang === value.idPengarang)}
                    label={<small>{value.namaPengarang}</small>} />
                </Col>
              ))}
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className={"d-flex justify-content-end"}>
          {buku.idBuku && (
            <Button onClick={onBukuUpdate}>Update</Button>
          )}
          {!buku.idBuku && (
            <Button onClick={onBukuCreate}>Submit</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ComponentBukuCreate;