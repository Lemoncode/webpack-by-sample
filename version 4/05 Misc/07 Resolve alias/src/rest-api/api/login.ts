import { LoginEntity } from '../model';

export const login = (loginEntity: LoginEntity): Promise<any> => (
  isValidLogin(loginEntity) ?
    Promise.resolve() :
    Promise.reject('Not valid login or password')
);

const isValidLogin = (loginEntity: LoginEntity) => (
  loginEntity.login === 'admin' &&
  loginEntity.password === 'test'
);
