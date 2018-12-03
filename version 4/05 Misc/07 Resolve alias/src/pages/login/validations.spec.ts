import { validations } from './validations';

describe('pages/login/validations specs', () => {
  it('should return undefined validation result when passing wrong field', (done) => {
    // Arrange
    const vm = {
      wrongField: '',
    };

    const field = 'wrongField';
    const value = '';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult).toBeUndefined();
        done();
      });
  });

  it('should retun failed validation result when passing login field with empty value', (done) => {
    // Arrange
    const vm = {
      login: '',
    };

    const field = 'login';
    const value = '';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(fieldValidationResult.errorMessage).toEqual('Please fill in this mandatory field.');
        done();
      });
  });

  it('should retun succeeded validation result when passing login field with value', (done) => {
    // Arrange
    const vm = {
      login: '',
    };

    const field = 'login';
    const value = 'test value';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(fieldValidationResult.errorMessage).toEqual('');
        done();
      });
  });

  it('should retun failed validation result when passing password field with empty value', (done) => {
    // Arrange
    const vm = {
      password: '',
    };

    const field = 'password';
    const value = '';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(fieldValidationResult.errorMessage).toEqual('Please fill in this mandatory field.');
        done();
      });
  });

  it('should retun succeeded validation result when passing password field with value', (done) => {
    // Arrange
    const vm = {
      password: '',
    };

    const field = 'password';
    const value = 'test value';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(fieldValidationResult.errorMessage).toEqual('');
        done();
      });
  });
});
