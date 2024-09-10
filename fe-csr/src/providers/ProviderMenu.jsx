import useInjector from "../hooks/useInjector"

const ProviderMenu = () => {
  const { injectReducer, injectHTTP } = useInjector();
  
  return {
    menu: {
      ...injectReducer(), 
      ...injectHTTP(["usrmgmnt", "menu", "v1"]),
      batch: {
        ...injectHTTP(["usrmgmnt", "menu", "v1", "batch"]),
      }
    },
  }
}

export default ProviderMenu;