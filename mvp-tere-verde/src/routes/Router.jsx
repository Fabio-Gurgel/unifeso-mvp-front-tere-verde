import { Routes, Route } from "react-router-dom";

import { MainLayout } from "../layouts/main-layout/MainLayout";
import { AdminLayout } from "../layouts/admin-layout/AdminLayout";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/admin/login/login";
import { DashboardAdm } from "../pages/admin/dashboard/Dashboard";
import { Parks } from "../pages/parks/Parks";
import { Trails } from "../pages/trails/Trails";
import { Biodiversity } from "../pages/biodiversity/Biodiversity";

export function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/parques" element={<Parks />} />
        <Route path="/trilhas" element={<Trails />} />
        <Route path="/biodiversidade" element={<Biodiversity />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<DashboardAdm />} />
      </Route>
    </Routes>
  );
}
