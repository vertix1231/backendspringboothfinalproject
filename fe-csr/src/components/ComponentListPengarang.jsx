import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ComponentListPengarang({ listPengarang }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Lihat
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Daftar Divisi</Modal.Title>
        </Modal.Header>
        <Table responsive striped>
          <thead>
            <tr>
              <th>ID </th>
              <th>Nama</th>
            </tr>
          </thead>
          <tbody>
            {!listPengarang.length && (
              <tr>
                <td>No data to show...</td>
              </tr>
            )}
            {listPengarang && listPengarang.map((value) => (
              <tr key={value.idPengarang}>
                <td>{value.idPengarang}</td>
                <td>{value.namaPengarang}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal>
    </>
  );
}

export default ComponentListPengarang;