import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
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
  <div className="form-group">
    <label className="form-label">{label}</label>
    <div className="input-wrapper">
      <div className="input-icon">
        <Icon size={20} />
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="form-input"
        placeholder={placeholder}
        required
      />
      {suffix}
    </div>
  </div>
);

export function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      if (success) navigate("/admin");
      else setError("Credenciais inválidas. Verifique seus dados.");
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-container">
        <div className="auth-card">
          <header className="auth-header">
            <div className="logo-container">
              <Mountain size={40} color="white" />
            </div>
            <h1>Painel Administrativo</h1>
            <p>Parques de Teresópolis</p>
          </header>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <FormField
              label="Usuário"
              Icon={User}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Digite seu usuário"
            />

            <FormField
              label="Senha"
              Icon={Lock}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua senha"
              suffix={
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="spinner" /> : "Entrar"}
            </button>
          </form>

          <footer className="auth-footer">
            <div className="demo-info">
              <span>Demo:</span> usuário: <mark>admin</mark> | senha:{" "}
              <mark>admin123</mark>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
