import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// 1. Defina um tipo de usuário real, vindo do seu back-end
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean; // Essencial para evitar o flash de login no F5
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. Efeito para recuperar a sessão ao carregar o App
  useEffect(() => {
    const recoveredUser = localStorage.getItem("@App:user");
    const token = localStorage.getItem("@App:token");

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      // Aqui você configuraria o header do seu axios:
      // api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  // 3. Login assíncrono simulando chamada de API
  const login = async (username: string, password: string) => {
    try {
      // Simulação de chamada de API (Substitua pelo seu fetch/axios)
      // const response = await api.post('/sessions', { username, password });
      
      if (username === "admin" && password === "admin123") {
        const mockUser = { id: "1", name: "Admin", email: "admin@tere-verde.com" };
        const mockToken = "jwt-token-aqui";

        localStorage.setItem("@App:user", JSON.stringify(mockUser));
        localStorage.setItem("@App:token", mockToken);

        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        loading, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
