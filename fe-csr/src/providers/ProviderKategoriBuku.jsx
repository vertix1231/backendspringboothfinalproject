import useInjector from "../hooks/useInjector"

const ProviderKategoriBuku = () => {
  const { injectReducer, injectHTTP } = useInjector();
  
  return {
    kategoriBuku: {
      ...injectReducer(),
      ...injectHTTP(["book", "katbuku", "v1"]),
      batch: {
        // divisi.batch.reducer.objects.dispatch
        ...injectHTTP(["book", "katbuku", "v1", "batch"]),
      }
    },
  }
}

export default ProviderKategoriBuku;