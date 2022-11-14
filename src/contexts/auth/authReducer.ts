import { IAuthState } from 'types/auth';

type AuthAction = { type: 'LOGIN'; payload: '' } | { type: 'UPDATE_PROFILE'; payload: IAuthState };

export const authReducer = (state: IAuthState, action: AuthAction) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
