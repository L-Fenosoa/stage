// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

type Role = 'travailleur' | 'etablissement' | 'admin' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  name: string | null;
}

interface AuthContextProps extends AuthState {
  login: (userName: string, userRole: Role) => void;
  logout: () => void;
}

const defaultAuth: AuthState = {
  isAuthenticated: false,
  role: null,
  name: null,
};

const AuthContext = createContext<AuthContextProps>({
  ...defaultAuth,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultAuth.isAuthenticated);
  const [role, setRole] = useState<Role>(defaultAuth.role);
  const [name, setName] = useState(defaultAuth.name);

  // Charger l’état depuis localStorage au démarrage
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed: AuthState = JSON.parse(stored);
        setIsAuthenticated(parsed.isAuthenticated);
        setRole(parsed.role);
        setName(parsed.name);
      } catch {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  // Persister à chaque changement
  useEffect(() => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ isAuthenticated, role, name })
    );
  }, [isAuthenticated, role, name]);

  const login = (userName: string, userRole: Role) => {
    setIsAuthenticated(true);
    setName(userName);
    setRole(userRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setName(null);
    setRole(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, name, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
