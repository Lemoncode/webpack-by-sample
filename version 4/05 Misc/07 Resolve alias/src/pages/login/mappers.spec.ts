import * as model from '@/rest-api/model';
import * as vm from './viewModel';
import { mapLoginEntityVMToModel } from './mappers';

describe('pages/login/mappers specs', () => {
  describe('mapLoginEntityVMToModel', () => {
    it('should return null when passing loginEntity equals undefined', () => {
      // Arrange
      const loginEntity: vm.LoginEntity = undefined;

      // Act
      const result = mapLoginEntityVMToModel(loginEntity);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null when passing loginEntity equals null', () => {
      // Arrange
      const loginEntity: vm.LoginEntity = null;

      // Act
      const result = mapLoginEntityVMToModel(loginEntity);

      // Assert
      expect(result).toBeNull();
    });

    it('should return same values when passing loginEntity equals empty values', () => {
      // Arrange
      const loginEntity: vm.LoginEntity = {
        login: '',
        password: '',
      };

      // Act
      const result = mapLoginEntityVMToModel(loginEntity);

      // Assert
      expect(result).toEqual({
        login: '',
        password: '',
      });
    });

    it('should return same values when passing loginEntity with values', () => {
      // Arrange
      const loginEntity: vm.LoginEntity = {
        login: 'test login',
        password: 'test password',
      };

      // Act
      const result = mapLoginEntityVMToModel(loginEntity);

      // Assert
      expect(result).toEqual({
        login: loginEntity.login,
        password: loginEntity.password,
      });
    });
  });
});
