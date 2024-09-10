import useInjector from "../hooks/useInjector"

const ProviderAkses = () => {
  const { injectReducer, injectHTTP } = useInjector();
  
  return {
    pengarang: {
      ...injectReducer(), 
      ...injectHTTP(["book", "pengarang", "v1"]),
      batch: {
        ...injectHTTP(["book", "pengarang", "v1", "batch"]),
      }
    },
  }
}

export default ProviderAkses;