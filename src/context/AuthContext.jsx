import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("noura-user") || "null"),
  );

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("noura-users") || "[]");
    const found = users.find(
      (item) => item.email === email && item.password === password,
    );
    if (!found)
      return {
        ok: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      };
    const session = { name: found.name, email: found.email };
    localStorage.setItem("noura-user", JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("noura-users") || "[]");
    if (users.some((item) => item.email === email))
      return { ok: false, message: "هذا البريد مسجل مسبقًا." };
    users.push({ name, email, password });
    localStorage.setItem("noura-users", JSON.stringify(users));
    const session = { name, email };
    localStorage.setItem("noura-user", JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("noura-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
