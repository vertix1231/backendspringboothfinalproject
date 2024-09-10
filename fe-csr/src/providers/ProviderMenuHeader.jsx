import useInjector from "../hooks/useInjector"

const ProviderMenuHeader = () => {
  const { injectReducer, injectHTTP } = useInjector();
  
  return {
    menuheader: {
      ...injectReducer(), 
      ...injectHTTP(["usrmgmnt", "menuheader", "v1"]),
      batch: {
        ...injectHTTP(["usrmgmnt", "menuheader", "v1", "batch"]),
      }
    },
  }
}

export default ProviderMenuHeader;