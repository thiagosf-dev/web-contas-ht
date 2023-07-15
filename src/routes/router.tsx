import { Route, Routes } from "react-router-dom";
import { ListarContas } from "../pages/Contas/ListarContas";
import { Home } from "../pages/Home/Home";

export const Routers = () => {
  return (
    <Routes >
      <Route path={'/'} element={<Home />}></Route>
      <Route path={'/listar/contas'} element={<ListarContas />}></Route>
    </Routes>
  )
}