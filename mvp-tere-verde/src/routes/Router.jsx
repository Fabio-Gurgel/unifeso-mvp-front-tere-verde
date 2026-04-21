import { Routes, Route } from "react-router-dom";

import { MainLayout } from "../layouts/main-layout/MainLayout";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/admin/login/login";
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
    </Routes>
  );
}
