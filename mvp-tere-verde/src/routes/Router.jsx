import { Routes, Route } from "react-router-dom";

import { MainLayout } from "../layouts/main-layout/MainLayout";
import { AdminLayout } from "../layouts/admin-layout/AdminLayout";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/admin/login/login";
import { DashboardAdm } from "../pages/admin/dashboard/Dashboard";
import { Parks } from "../pages/parks/Parks";
import { Trails } from "../pages/trails/Trails";
import { Biodiversity } from "../pages/biodiversity/Biodiversity";
import { FloraForm } from "../pages/admin/forms/flora-form/FloraForm";
import { FaunaForm } from "../pages/admin/forms/fauna-form/FaunaForm";
import { ParksManager } from "../pages/admin/managers/park-manager/ParkManager";
import { ParkForm } from "../pages/admin/forms/park-form/ParkForm";
import { EventsManager } from "../pages/admin/managers/event-manager/EventManager";
import { FaunasManager } from "../pages/admin/managers/fauna-manager/FaunaManager";
import { FlorasManager } from "../pages/admin/managers/flora-manager/FloraManager";
import { TrailsManager } from "../pages/admin/managers/trail-manager/TrailManager";
import { WaterfallsManager } from "../pages/admin/managers/waterfall-manager/WaterfallManager";
import { WaterfallForm } from "../pages/admin/forms/waterfall-form/WaterfallForm"


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
        <Route path="/admin/parques" element={<ParksManager />} />
        <Route path="/admin/parques/novo" element={<ParkForm />} />
        <Route path="/admin/parques/editar/:id" element={<ParkForm />} />
        <Route path="/admin/trilhas" element={<TrailsManager />} />
        <Route path="/admin/cachoeiras" element={<WaterfallsManager />} />
        <Route path="/admin/cachoeiras/novo" element={<WaterfallForm />} />
        <Route path="/admin/cachoeiras/editar/:id" element={<WaterfallForm />} />
        <Route path="/admin/eventos" element={<EventsManager />} />
        <Route path="/admin/fauna" element={<FaunasManager />} />
        <Route path="/admin/faunas/novo" element={<FaunaForm />} />
        <Route path="/admin/faunas/editar/:id" element={<FaunaForm />} />
        <Route path="/admin/flora" element={<FlorasManager />} />
        <Route path="/admin/floras/novo" element={<FloraForm />} />
        <Route path="/admin/floras/editar/:id" element={<FloraForm />} />
      </Route>
    </Routes>
  );
}
