import { createContext } from 'react';

export interface IAuthContext {
  name: string;
  image: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
