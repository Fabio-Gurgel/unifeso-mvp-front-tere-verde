import { Routes, Route } from "react-router-dom";

import { MainLayout } from "../layouts/main-layout/MainLayout";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/login";
import { ParksList } from "../pages/parks/parks-list/ParksList";

export function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parques" element={<ParksList />} />
      </Route>
    </Routes>
  );
}
