import useInjector from "../hooks/useInjector"

const ProviderAkses = () => {
  const { injectReducer, injectHTTP } = useInjector();
  
  return {
    akses: {
      ...injectReducer(), 
      ...injectHTTP(["usrmgmnt", "akses", "v1"]),
      batch: {
        ...injectHTTP(["usrmgmnt", "akses", "v1", "batch"]),
      }
    },
  }
}

export default ProviderAkses;