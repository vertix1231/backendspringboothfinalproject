import useInjector from "../hooks/useInjector.jsx";
import ContextGeneric from "../contexts/ContextGeneric.jsx";
import {Outlet} from "react-router-dom";
import ComponentNavbar from "../components/ComponentNavbar";
import ProviderAuthentication from "../providers/ProviderAuthentication.jsx";
import ProviderDivisi from "../providers/ProviderDivisi.jsx";
import ProviderMenuHeader from "../providers/ProviderMenuHeader.jsx";
import ProviderMenu from "../providers/ProviderMenu.jsx";
import ProviderAkses from "../providers/ProviderAkses.jsx";
import ProviderItem from "../providers/ProviderItem.jsx";
import ProviderKategoriBuku from "../providers/ProviderKategoriBuku.jsx";
import ProviderBuku from "../providers/ProviderBuku.jsx";
import ProviderPengarang from "../providers/ProviderPengarang.jsx";

const OutletAuthenticated = () => {
  const { injectReducer, injectHTTP, injectServices } = useInjector();
  const settings = {
    ...ProviderAuthentication(),
    ...ProviderDivisi(),
    ...ProviderMenuHeader(),
    ...ProviderMenu(),
    ...ProviderAkses(),
    ...ProviderItem(),
    ...ProviderKategoriBuku(),
    ...ProviderBuku(),
    ...ProviderPengarang(),
    services: {
      ...injectServices()
    },
    // Variabel untuk shared data ke semua komponen dan halaman bersifat sementara
    // kalo halaman page di refresh data nya otomatis hilang
    // semua dikarenakan injectReducer()
    users: {
      ...injectReducer(),//model untuk inject datanya      
    },
    budgets: {
      ...injectReducer(),
      ...injectHTTP(["budgets"]),
    },

    requirements: {
      ...injectReducer(),
      ...injectHTTP(["requirements"]),
    },
    categories: {
      ...injectReducer(),
      ...injectHTTP(["requirements", "categories"]),
    },
    items: {
      ...injectReducer(),
      ...injectHTTP(["budgets", "items"]),
    },
    budgetCategories: {
      ...injectReducer(),
      ...injectHTTP(["budgets", "budget-categories"]),
    }
  }

  return (
    <ContextGeneric.Provider value={{...settings}} >
      <div >
        {/* <ComponentNavbar /> */}
        <Outlet />
      </div>
    </ContextGeneric.Provider>
  )

}

export default OutletAuthenticated;