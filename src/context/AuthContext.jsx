import { createContext, useState } from 'react';
import { register, login } from '../api/auth'
import * as jwt from 'jsonwebtoken'

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  return (
    <AuthProvider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name
        },
        register: async (data) => {
          const { success, authToken } = await 
          register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload)
            setIsAuthenticated(true)
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null)
            setIsAuthenticated(false)
          }
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await 
          login({ 
            username: data.username, 
            password: data.password 
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        }
      }}
    >
      {children}
    </AuthProvider>
  );
};