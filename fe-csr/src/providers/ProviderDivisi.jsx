import useInjector from "../hooks/useInjector"

const ProviderDivisi = () => {
  const { injectReducer, injectHTTP } = useInjector();
  
  return {
    divisi: {//seluruh form bersifat generic, object ini akan dibawa terus di modul tersebut
      ...injectReducer(), // divisi.reducer.objects.dispatch
      ...injectHTTP(["usrmgmnt", "divisi", "v1"]),
      batch: {
        // divisi.batch.reducer.objects.dispatch
        ...injectHTTP(["usrmgmnt", "divisi", "v1", "batch"]),
      }
    },
  }
}

export default ProviderDivisi;