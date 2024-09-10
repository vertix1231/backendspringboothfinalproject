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
        Lihat Menu
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
            {!listMenuAkses.length && (
              <tr>
                <td>No data to show...</td>
              </tr>
            )}
            {listMenuAkses && listMenuAkses.map((value) => (
              <tr key={value.idMenu}>
                <td>{value.idMenu}</td>
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