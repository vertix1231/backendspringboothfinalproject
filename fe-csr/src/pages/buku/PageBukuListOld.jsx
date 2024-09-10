// import { useContext, useEffect, useState, useRef } from "react"
// import ContextGeneric from "../../contexts/ContextGeneric"
// import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup, Dropdown } from "react-bootstrap"
// import ComponentNavbar from "../../components/ComponentNavbar"
// import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants"
// import useValidationGroup from "../../hooks/useValidationGroup.jsx";
//
// const bukuInit = {judulBuku: null, tahunTerbit: null, kategoriBuku: null}
//
// const PageBukuList = () => {
//   const { buku } = useContext(ContextGeneric)
//   const [searchParams, setSearchParams] = useState([]);
//   const [bukuValidations, setBukuValidations] = useState({});
//   const validationGrup = useValidationGroup();
//
//   const [paging, setPaging] = useState({
//     totalPages: 0,
//     totalItems: 0,
//     numberOfElements: 0,
//   })
//
//   const [params, setParams] = useState({
//     page: 0,
//     sort: "asc",
//     sortby:"id",
//     columnFirst:"",
//     valueFirst:"",
//     sizeComponent:3,
//   })
//
//   const searchBukuRef = useRef({value: ""})
//
//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
//   }
//
//   const httpBukuList = () => {
//     setBukuValidations({})
//     buku.http.list.execute({...params, valueFirst: searchBukuRef.current.value || ""}).then((response) => {
//       const {content, searchParam, listGroup, ...sisa} = response.data.data;
//       setSearchParams(searchParam);
//       setParams({...params})
//       searchBukuRef.current.value = sisa.valueFirst;
//       setPaging(sisa);
//
//       buku.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
//       buku.reducer.objects.dispatch({
//         type: REDUCER_OBJECT_ACTIONS.SET,
//         data: {listGroup: [...listGroup]}
//       })
//     }).catch((error) => {
//       // console.log("error !!nih kode nye .... ",error.response.data.errorCode)
//       // console.log("error !!nih listgroup nye .... ",error.response.data.data.listGroup)
//       if(error.response.data.errorCode === "FV11052"){
//         buku.reducer.objects.dispatch({
//           type: REDUCER_OBJECT_ACTIONS.SET,
//           data: {listGroup: [...error.response.data.data.listGroup]}
//         })
//       }
//     })
//   }
//
//   const httpBukuCreate = () => {
//     setBukuValidations({})
//     const {listGroup, ...payload} = buku.reducer.objects.state
//     buku.http.create.execute(payload).then((response) => {
//       buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
//       httpBukuList();
//     }).catch((error) => {
//       setBukuValidations(validationGrup(error))
//     })
//   }
//
//   const httpBukuUpdate = () => {
//     setBukuValidations({})
//     const {idBuku, listGroup, ...payload} = buku.reducer.objects.state
//     buku.http.update.execute({...payload}, idBuku).then((response) => {
//       buku.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: buku.reducer.objects.state, key: "idBuku"})
//       buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
//       httpBukuList();
//     }).catch((error) => {
//       // console.log(error);
//       setBukuValidations(validationGrup(error))
//     })
//   }
//
//   const httpBukuDelete = () => {
//     const {idBuku} = buku.reducer.objects.state
//     buku.http.remove.execute(idBuku).then((response) => {
//       buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
//         httpBukuList();
//       }).catch((error) => {
//         // console.log(error);
//       })
//   }
//
//   useEffect(() => {
//     httpBukuList()
//     buku.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET,
//     data: bukuInit
//   })
//   }, [params.page])
//
// const selectBuku = (data) => {
//   buku.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
// }
//
// const onBukuNext = () => {
//   if (params.page < paging.totalPages) {
//     setParams({...params, page: params.page + 1});
//   }
// }
//
// const onBukuPrevious = () => {
//   if (params.page > 0) {
//     setParams({...params, page: params.page-1});
//   }
// }
//   return (
//     <>
//       <ComponentNavbar />
//       <Container className="mt-4 mb-4">
//         <Row className="mb-4">
//           <Col md={6}>
//             <Card>
//               {/* {JSON.stringify(menu.reducer.objects.state)} */}
//               <Card.Body className="">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Judul</Form.Label>
//                   <Form.Control
//                     placeholder="Judul Buku"
//                     name={"judulBuku"}
//                     onChange={handleChange}
//                     value={buku.reducer.objects.state.judulBuku || ""}
//                   />
//                   {bukuValidations.judulBuku && (
//                     <ul className="list-unstyled">
//                       {bukuValidations.judulBuku.map((value, index) => (
//                         <li key={index} className="text-danger text-lowercase">{value.message}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </Form.Group >
//                 <Form.Group>
//                 <Form.Label>Tahun</Form.Label>
//                   <Form.Control
//                     placeholder="Tahun Terbit"
//                     name={"tahunTerbit"}
//                     onChange={handleChange}
//                     value={buku.reducer.objects.state.tahunTerbit || ""}
//                   />
//                   {bukuValidations.tahunTerbit && (
//                     <ul className="list-unstyled">
//                       {bukuValidations.tahunTerbit.map((value, index) => (
//                         <li key={index} className="text-danger text-lowercase">{value.message}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </Form.Group>
//                 <Form.Group className={"vw-100 mb-3 mt-3"}>
//                   <Form.Label>Groups</Form.Label>
//                   <div className="d-grid gap-2">
//                   <Dropdown className={"w-100 mb-3 mt-3"} >
//                     <Dropdown.Toggle variant={"success"} id="dropdown-basic">
//                       {buku.reducer.objects.state.kategoriBuku?.namaKategoriBuku ? buku.reducer.objects.state.kategoriBuku?.namaKategoriBuku : "Pilih"}
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       {buku.reducer.objects.state.listGroup && buku.reducer.objects.state.listGroup.map((value) => (
//                         <Dropdown.Item
//                         active={value.idKategoriBuku === buku.reducer.objects.state.kategoriBuku?.idKategoriBuku}
//                         key={value.idKategoriBuku}
//                         onClick={(e) => {
//                           buku.reducer.objects.dispatch({
//                             type: REDUCER_OBJECT_ACTIONS.SET,
//                             data: {kategoriBuku: value},
//                           })
//                         }}>{value.namaKategoriBuku}</Dropdown.Item>
//                       ))}
//                     </Dropdown.Menu>
//                   </Dropdown>
//                   </div>
//                   {bukuValidations.kategoriBuku && (
//                     <ul className="list-unstyled">
//                       {bukuValidations.kategoriBuku.map((value, index) => (
//                         <li key={index} className="text-danger text-lowercase">{value.message}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </Form.Group>
//               </Card.Body>
//               <Card.Footer className="d-flex justify-content-end">
//                 <ButtonGroup>
//                   <Button variant="outline-primary" onClick={() => {
//                     const listGroup = [...buku.reducer.objects.state.listGroup];
//                     buku.reducer.objects.dispatch({
//                       type: REDUCER_OBJECT_ACTIONS.EMPTY,
//                     })
//                     buku.reducer.objects.dispatch({
//                       type: REDUCER_OBJECT_ACTIONS.SET,
//                       data: {listGroup},
//                     })
//                     setBukuValidations({})
//                   }}>
//                     Clear
//                   </Button>
//                   {buku.reducer.objects.state.idBuku ? (
//                     <>
//                         <Button variant="outline-primary" onClick={httpBukuDelete}>Delete</Button>
//                         <Button onClick={httpBukuUpdate}>Update</Button>
//                     </>
//                   ) : (
//                     <Button onClick={httpBukuCreate}>Submit</Button>
//                   )}
//
//                 </ButtonGroup>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={12}>
//             <Card>
//               <Card.Body className="d-flex justify-content-end align-items-start" >
//                 <Card.Title>BUKU</Card.Title>
//                 <InputGroup className="w-30">
//                   <Form.Select onChange={(e) => {
//                     searchBukuRef.current.value = ""
//                     setParams({...params, columnFirst: e.target.value});
//                   }}>
//                     {!params.columnFirst && (
//                       <option>Pilih ...</option>
//                     )}
//                     {searchParams.map((val, index) => (
//                       <option key={index} value={val.key}>{val.label}</option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control ref={searchBukuRef} />
//                   <Button onClick={httpBukuList}>Search</Button>
//                 </InputGroup>
//               </Card.Body>
//               <Table responsive striped>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Judul</th>
//                     <th>Tahun</th>
//                     <th>Kategori</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
//                   {buku.reducer.list.state.map((value) => (
//                     <tr key={value.idBuku} onClick={() => selectBuku(value)}>
//                       <td>{value.idBuku}</td>
//                       <td>{value.judulBuku}</td>
//                       <td>{value.tahunTerbit}</td>
//                       <td>{value.kategoriBuku.namaKategoriBuku}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//               <Card.Footer className="d-flex justify-content-end">
//                 <ButtonGroup>
//                   <Button disabled={params.page <= 0} onClick={onBukuPrevious}>Prev</Button>
//                   <Button disabled={params.page >= paging.totalPages - 1} onClick={onBukuNext}>Next</Button>
//                 </ButtonGroup>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   )
// }
//
// export default PageBukuList;