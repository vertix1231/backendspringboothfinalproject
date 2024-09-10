import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ComponentListMenuAkses({ listMenuAkses }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Lihat Divisi
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Daftar Divisi</Modal.Title>
        </Modal.Header>
        <Table responsive striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Menu</th>
            </tr>
          </thead>
          <tbody>
            {listMenuAkses && listMenuAkses.map((value) => (
              <tr key={value.idMenu}>
                <td>{value.namaMenu}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal>
    </>
  );
}

export default ComponentListMenuAkses;