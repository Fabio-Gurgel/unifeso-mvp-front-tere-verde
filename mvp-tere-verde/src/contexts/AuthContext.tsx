import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import userService from "../services/userService";
import api from "../services/api";

interface User {
  id: number;
  nome: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const recoveredUser = localStorage.getItem("@App:user");
    const token = localStorage.getItem("@App:token");

    if (recoveredUser && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return JSON.parse(recoveredUser);
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const users = await userService.getAll({ nome: username });

      if (users.length > 0) {
        const foundUser = users[0];

        if (foundUser.senha === password) {
          const userData = { id: foundUser.id, nome: foundUser.nome };
          const mockToken = `fake-jwt-token-${foundUser.id}`;

          localStorage.setItem("@App:user", JSON.stringify(userData));
          localStorage.setItem("@App:token", mockToken);

          api.defaults.headers.common["Authorization"] = `Bearer ${mockToken}`;

          setUser(userData);
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      return false;
    }
  };

  const logout = () => {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, login, logout }}
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
