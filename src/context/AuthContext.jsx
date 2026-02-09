import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // [cite: 18, 20]

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado inicial null (usuario no logueado) [cite: 17]
  const [user, setUser] = useState(null);

  // 1. Persistencia: Al cargar, buscar si hay usuario guardado [cite: 8, 24]
  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para manejar la respuesta exitosa de Google
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // 2. Decodificar el token para obtener datos (nombre, foto, email) [cite: 7, 18]
      const decoded = jwtDecode(credentialResponse.credential);

      const userData = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      setUser(userData);
      localStorage.setItem("googleUser", JSON.stringify(userData)); // Guardar en localStorage [cite: 24]
    } catch (error) {
      console.error("Error al decodificar el login:", error);
    }
  };

  // Función de Cerrar Sesión [cite: 22]
  const logout = () => {
    setUser(null);
    localStorage.removeItem("googleUser");
    // Opcional: recargar página para limpiar estados residuales
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, handleGoogleSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
