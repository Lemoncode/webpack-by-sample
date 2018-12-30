import * as model from '@/rest-api/model';
import * as vm from './viewModel';

export const mapLoginEntityVMToModel = (loginEntity: vm.LoginEntity): model.LoginEntity => (
  Boolean(loginEntity) ?
    {
      ...loginEntity,
    } :
    null
);
