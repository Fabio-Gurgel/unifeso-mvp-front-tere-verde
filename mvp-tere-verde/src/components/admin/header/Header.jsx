import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { LayoutDashboard, LogOut } from "lucide-react";

export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-green-700 p-2 rounded-xl">
              <LayoutDashboard className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl text-neutral-800">
                Painel Administrativo
              </h1>
              <p className="text-sm text-neutral-600">Parques de Teresópolis</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors"
          >
            <LogOut className="size-4" />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
