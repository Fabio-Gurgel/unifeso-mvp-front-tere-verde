import { Navigate } from "react-router";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Header } from "../../components/admin/header/Header";
import { Footer } from "../../components/footer/Footer";

export function AdminLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/admin/login" />;

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
