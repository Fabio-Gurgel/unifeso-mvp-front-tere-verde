import { Routes, Route } from "react-router-dom";

import { MainLayout } from "../layouts/mainLayout/MainLayout";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/login";

export function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
