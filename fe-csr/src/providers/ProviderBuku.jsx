import useInjector from "../hooks/useInjector"

const ProviderBuku = () => {
  const { injectReducer, injectHTTP } = useInjector();
  
  return {
    buku: {
      ...injectReducer(), 
      ...injectHTTP(["book", "buku", "v1"]),
      batch: {
        ...injectHTTP(["book", "buku", "v1", "batch"]),
      }
    },
  }
}

export default ProviderBuku;