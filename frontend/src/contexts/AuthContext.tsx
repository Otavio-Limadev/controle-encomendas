import { createContext, useContext, useState, ReactNode } from "react";

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
}

const employees: Employee[] = [
  { id: 1, name: "Ana Paula", email: "ana@eva.com", role: "Atendente", initials: "AP" },
  { id: 2, name: "João Souza", email: "joao@eva.com", role: "Atendente", initials: "JS" },
  { id: 3, name: "Maria Lima", email: "maria@eva.com", role: "Supervisora", initials: "ML" },
  { id: 4, name: "Carlos Neto", email: "carlos@eva.com", role: "Atendente", initials: "CN" },
];

interface AuthContextType {
  user: Employee | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Employee | null>(null);

  const login = (email: string, _password: string) => {
    const found = employees.find(
      (e) => e.email.toLowerCase() === email.toLowerCase()
    );
    if (!found) return { success: false, error: "Usuário não encontrado" };
    setUser(found);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
