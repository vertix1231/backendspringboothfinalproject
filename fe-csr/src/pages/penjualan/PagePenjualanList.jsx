// import { useContext, useEffect, useState, useRef } from "react"
// import ContextGeneric from "../../contexts/ContextGeneric.jsx"
// import { Container, Row, Col, Card, Table, Form, Button, ButtonGroup, InputGroup, Dropdown } from "react-bootstrap"
// import ComponentNavbar from "../../components/ComponentNavbar.jsx"
// import { REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS } from "../../config/constants.js"
// import useValidationGroup from "../../hooks/useValidationGroup.jsx";
// import ComponentAksesCreate from "../../components/ComponentAksesCreate.jsx"
// import ComponentListPenjualanDetail from "../../components/ComponentListPenjualanDetail.jsx";
//
// const aksesInit = {namaAkses: null, divisi: null}
//
// const PagePenjualanList = () => {
//
//   const { penjualan } = useContext(ContextGeneric)
//   const [penjualanDetailGroup, setPenjualanDetailGroup] = useState([]);
//
//   const [searchParams, setSearchParams] = useState([]);
//   const [penjualanValidations, setPenjualanValidations] = useState({});
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
//     sizeComponent: 10,
//   })
//
//   const searchPenjualanRef = useRef({value: ""})
//
//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     penjualan.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
//   }
//
//   const httpPenjualanList = () => {
//     setPenjualanValidations({})
//     penjualan.http.list.execute({...params, valueFirst: searchPenjualanRef.current.value || ""}).then((response) => {
//
//       const {content, searchParam, listPenjualanDetail, ...sisa} = response.data.data;
//
//       setPenjualanDetailGroup(listPenjualanDetail);
//       setSearchParams(searchParam);
//       setParams({...params})
//       searchPenjualanRef.current.value = sisa.valueFirst;
//       setPaging(sisa);
//       penjualan.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: content})
//     }).catch((error) => {
//     })
//   }
//
//   const httpPenjualanCreate = () => {
//     setPenjualanValidations({})
//     const {listGroup, ...payload} = penjualan.reducer.objects.state
//     penjualan.http.create.execute(payload).then((response) => {
//       penjualan.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
//       httpPenjualanList();
//     }).catch((error) => {
//       setPenjualanValidations(validationGrup(error))
//     })
//   }
//
//   const httpPenjualanUpdate = () => {
//     setPenjualanValidations({})
//     const {idAkses, listGroup, ...payload} = penjualan.reducer.objects.state
//     penjualan.http.update.execute({...payload}, idAkses).then((response) => {
//       penjualan.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.CHANGE, data: penjualan.reducer.objects.state, key: "idAkses"})
//       penjualan.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
//       httpPenjualanList();
//     }).catch((error) => {
//       setPenjualanValidations(validationGrup(error))
//     })
//   }
//
//   const httpPenjualanDelete = () => {
//     const {idAkses} = penjualan.reducer.objects.state
//     penjualan.http.remove.execute(idAkses).then((response) => {
//
//       penjualan.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.EMPTY})
//         httpPenjualanList();
//       }).catch((error) => {
//       })
//   }
//
//   useEffect(() => {
//     httpPenjualanList()
//       penjualan.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET,
//       data: aksesInit
//     })
//   }, [params.page])
//
// const selectPenjualan = (data) => {
//   penjualan.reducer.objects.dispatch({ type:  REDUCER_OBJECT_ACTIONS.SET, data })
// }
//
// const onPenjualanNext = () => {
//   if (params.page < paging.totalPages) {
//     setParams({...params, page: params.page + 1});
//   }
// }
//
// const onPenjualanPrevious = () => {
//   if (params.page > 0) {
//     setParams({...params, page: params.page-1});
//   }
// }
//   return (
//     <>
//       <ComponentNavbar />
//       <Container className="mt-4 mb-4">
//         <Row>
//           <Col md={12}>
//             <Card>
//               <Card.Header>
//                 {penjualan.reducer.objects.state && (
//                   <ComponentAksesCreate
//                     title={"Buat Transaksi"}
//                     pAkses={null}
//                     pListGroupDivisi={daftarGroupDivisi}
//                     pListGroupMenu={penjualanDetailGroup}
//                   />
//                 )}
//               </Card.Header>
//               <Card.Body className="d-flex justify-content-end align-items-start" >
//
//                 <Card.Title>Penjualan</Card.Title>
//                 <InputGroup className="w-30">
//                   <Form.Select onChange={(e) => {
//                     searchPenjualanRef.current.value = ""
//                     setParams({...params, columnFirst: e.target.value});
//                   }}>
//                     {!params.columnFirst && (
//                       <option>Pilih ...</option>
//                     )}
//                     {searchParams.map((val, index) => (
//                       <option key={index} value={val.key}>{val.label}</option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control ref={searchPenjualanRef} />
//                   <Button onClick={httpPenjualanList}>Search</Button>
//                 </InputGroup>
//               </Card.Body>
//
//               <Table responsive striped>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Struk</th>
//                     <th>Qty</th>
//                     <th>Total</th>
//                     <th>Diskon</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* map itu adalah container bawaan javascript, sama dengan List di Java */}
//                   {penjualan.reducer.list.state.map((value) => (
//                     <tr key={value.idPenjualan} onClick={() => selectPenjualan(value)}>
//                       <td>{value.idPenjualan}</td>
//                       <td>{value.struk}</td>
//                       <td>{value.totalItem}</td>
//                       <td>{value.totalPembelian}</td>
//                       <td>{value.totalDiscount}</td>
//                       <td>
//                         <ComponentListPenjualanDetail listPenjualanDetail={value.listPnjualanDetail} />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//               <Card.Footer className="d-flex justify-content-end">
//                 <ButtonGroup>
//                   {/*secara otomatis akan membuat enable jika kondisi yang didalam nya tidak terpenuhi*/}
//                   <Button disabled={params.page <= 0} onClick={onPenjualanPrevious}>Prev</Button>
//                   <Button disabled={params.page >= paging.totalPages - 1} onClick={onPenjualanNext}>Next</Button>
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
// export default PagePenjualanList;