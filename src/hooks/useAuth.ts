import { AuthContext } from 'contexts/auth/AuthContext';
import React, { useContext } from 'react';

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;
