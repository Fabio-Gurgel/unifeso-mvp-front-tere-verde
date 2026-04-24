import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import userService from "../../../services/userService";
import { Lock, User, Mountain, Eye, EyeOff, Loader2 } from "lucide-react";

const FormField = ({
  label,
  type,
  Icon,
  name,
  value,
  onChange,
  placeholder,
  suffix,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-neutral-700">
      {label}
    </label>

    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-green-600 transition-colors">
        <Icon size={20} />
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-12 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all placeholder:text-neutral-400"
        placeholder={placeholder}
        required
      />
      {suffix}
    </div>
  </div>
);

export function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [demoUser, setDemoUser] = useState({ nome: "", senha: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const success = await login(formData.username, formData.password);

      if (success) {
        navigate("/admin");
      } else {
        setError("Credenciais inválidas. Verifique seus dados.");
      }
    } catch (err) {
      console.log(err);

      setError("Ocorreu um erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoCredentials = async () => {
    try {
      const users = await userService.getAll();
      if (users && users.length > 0) {
        setDemoUser(users[0]);
      }
    } catch (err) {
      console.error("Erro ao carregar dados demo", err);
    }
  }

  useEffect(() => {
    loadDemoCredentials();
  }, []);

  return (
    <div className="login-page min-h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <main className="relative w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 sm:p-10 border border-white/20">
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-700 rounded-3xl shadow-lg shadow-green-900/20 mb-6 rotate-3 hover:rotate-0 transition-transform cursor-default">
              <Mountain className="size-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
              Acesso Restrito
            </h1>

            <p className="text-neutral-500 mt-2 font-medium">
              Painel Parques de Teresópolis
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-xl text-sm font-medium">
                {error}
              </div>
            )}

            <FormField
              label="Usuário"
              Icon={User}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Ex: admin"
            />
            <FormField
              label="Senha"
              Icon={Lock}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full bg-green-700 hover:bg-green-800 disabled:bg-green-800/70 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-900/20 active:scale-[0.98] flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="animate-spin size-6" />
              ) : (
                "Acessar Painel"
              )}
            </button>
          </form>

          <footer className="mt-8 pt-6 border-t border-neutral-100">
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-3">
              <span>Ambiente de Demonstração</span>
            </div>

            <div className="flex justify-center gap-3">
              <div className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-1 rounded-md border border-neutral-200">
                <span className="font-bold">user:</span> {demoUser.nome}
              </div>

              <div className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-1 rounded-md border border-neutral-200">
                <span className="font-bold">pass:</span> {demoUser.senha}
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
