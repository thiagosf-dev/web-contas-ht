import { Route, Routes } from "react-router-dom";
import { AccountRegister } from "../pages/Accounts/AccountRegister";
import { AccountsList } from "../pages/Accounts/AccountsList";
import { Home } from "../pages/Home/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/listar/contas" element={<AccountsList />} />
      <Route path="/cadastrar/contas" element={<AccountRegister />} />
    </Routes>
  );
}
