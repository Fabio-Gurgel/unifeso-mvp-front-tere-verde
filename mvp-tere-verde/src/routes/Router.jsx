import { Routes, Route } from "react-router-dom";

import { MainLayout } from "../layouts/main-layout/MainLayout";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/login";
import { Parks } from "../pages/parks/Parks";
import { TrailsList } from "../pages/trails/trails-list/TrailsList";

export function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parques" element={<Parks />} />
        <Route path="/trilhas" element={<TrailsList />} />
      </Route>
    </Routes>
  );
}
