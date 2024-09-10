// import useInjector from "../hooks/useInjector"
//
// const ProviderPenjualan = () => {
//   const { injectReducer, injectHTTP } = useInjector();
//
//   return {
//     penjualan: {
//       ...injectReducer(),
//       ...injectHTTP(["jualbeli", "penjualan", "v1"]),
//       batch: {
//         ...injectHTTP(["jualbeli", "penjualan", "v1", "batch"]),
//       }
//     },
//   }
// }
//
// export default ProviderPenjualan;