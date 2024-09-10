import useInjector from "../hooks/useInjector"

const ProviderItem = () => {
  const { injectReducer, injectHTTP } = useInjector();
  
  return {
    item: {
      ...injectReducer(),
      ...injectHTTP(["jualbeli", "item", "v1"]),
      batch: {
        // divisi.batch.reducer.objects.dispatch
        ...injectHTTP(["jualbeli", "item", "v1", "batch"]),
      }
    },
  }
}

export default ProviderItem;