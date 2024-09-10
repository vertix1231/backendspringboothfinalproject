// import { useState } from 'react';
// import { Table } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
//
// function ComponentListPenjualanDetail({ listPenjualanDetail },noStruk) {
//   const [show, setShow] = useState(false);
//
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//
//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Lihat Menu
//       </Button>
//
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Daftar Divisi</Modal.Title>
//           <Modal.Title>Nomor Struk + 'noStruk'</Modal.Title>
//         </Modal.Header>
//         <Table responsive striped>
//           <thead>
//             <tr>
//               <th>ID </th>
//               <th>Nama Item</th>
//               <th>Qty</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!listPenjualanDetail.length && (
//               <tr>
//                 <td>No data to show...</td>
//               </tr>
//             )}
//             {listPenjualanDetail && listPenjualanDetail.map((value) => (
//               <tr key={value.idPenjualanDetail}>
//                 <td>{value.idPenjualanDetail}</td>
//                 <td>{value.item.namaItem}</td>
//                 <td>{value.harga}</td>
//                 <td>{value.nominalDiskon}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Modal>
//     </>
//   );
// }
//
// export default ComponentListPenjualanDetail;