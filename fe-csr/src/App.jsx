import {HashRouter, Route, Routes} from "react-router-dom";
import OutletAuthenticated from "./outlets/OutletAuthenticated.jsx";
import Page404 from "./pages/Page404.jsx";
import PageSignin from "./pages/auth/PageSignin.jsx";
import PageSignUp from "./pages/auth/PageSignUp.jsx";
import PageVerifyRegis from "./pages/auth/PageVerifyRegis.jsx";
import PageDivisiList from "./pages/divisi/PageDivisiList.jsx";
import PageMenuList from "./pages/menu/PageMenuList.jsx";
import PageMenuHeaderList from "./pages/menuheader/PageMenuHeaderList.jsx";
import PageAksesList from "./pages/akses/PageAksesList.jsx";
import PageHome from "./pages/auth/PageHome.jsx";
import PageForgotPwd from "./pages/auth/PageForgotPwd.jsx";
import PageVerifyForgotPwd from "./pages/auth/PageVerifyForgotPwd.jsx";
import PageConfirmForgotPwd from "./pages/auth/PageConfirmForgotPwd.jsx";
import PageKategoriBukuList from "./pages/katbuku/PageKategoriBukuList.jsx";
import PageItemList from "./pages/item/PageItemList.jsx";
import PageBukuList from "./pages/buku/PageBukuList.jsx";
import PagePengarangList from "./pages/pengarang/PagePengarangList.jsx";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
        <Route path={"*"} element={<Page404 />} />
          <Route path={"/"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PageSignin />} />            
            <Route path={"signup"} element={<PageSignUp />} />
            <Route path={"verifyregis"} element={<PageVerifyRegis />} />
            <Route path={"verifyregis"} element={<PageVerifyRegis />} />
            <Route path={"forgotpwd"} element={<PageForgotPwd />} />
            <Route path={"verifyforgotpwd"} element={<PageVerifyForgotPwd />} />
            <Route path={"confirmforgotpwd"} element={<PageConfirmForgotPwd />} />
          </Route>
          <Route path={"/home"} element={<PageHome />} />
          <Route path={"/divisi"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PageDivisiList />} />            
          </Route>
          <Route path={"/menuheader"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PageMenuHeaderList />} />            
          </Route> 
          <Route path={"/menu"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PageMenuList />} />            
          </Route>
          <Route path={"/akses"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PageAksesList />} />            
          </Route>
          <Route path={"/item"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PageItemList />} />
          </Route>
          <Route path={"/katbuku"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PageKategoriBukuList />} />
          </Route>
          <Route path={"/buku"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PageBukuList />} />
          </Route>
          <Route path={"/pengarang"} element={<OutletAuthenticated />} >
            {/* ini untuk inisial dari path / */}
            <Route index={true} element={<PagePengarangList />} />
          </Route>
          {/*JANGAN LUPA DIIMPORT !!*/}

        </Routes>
      </HashRouter>
    </>
  )
}

export default App