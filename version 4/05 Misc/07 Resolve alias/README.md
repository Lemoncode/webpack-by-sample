# Resolve alias

In this sample we are going to testing Plain Vanilla JavaScript files.

We will start from sample _01 Add config_.

Summary steps:
 - Remove sample spec.
 - Add login mappers specs.
 - Add member list mappers specs.
 - Add login validations specs.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Exec tests in watch mode:

```bash
npm run test:watch
```

- Remove sample spec created on previous sample:

### ./src/sample.spec.ts
```diff
- describe('Sample tests', () => {
-   it('should pass spec', () => {
-     // Arrange

-     // Act

-     // Assert
-     expect(true).toBeTruthy();
-   });

-   it('should fail spec', () => {
-     // Arrange

-     // Act

-     // Assert
-     expect(false).toBeTruthy();
-   });
- });
```

- Add `login mappers` specs:

### ./src/pages/login/mappers.spec.ts
```javascript
import { mapLoginEntityVMToModel } from './mappers';

describe('pages/login/mappers specs', () => {
  describe('mapLoginEntityVMToModel', () => {

  });
});
```

- Add spec passing `undefined` value:

### ./src/pages/login/mappers.spec.ts
```diff
+ import * as model from '../../rest-api/model';
+ import * as vm from './viewModel';
import { mapLoginEntityVMToModel } from './mappers';

describe('pages/login/mappers specs', () => {
  describe('mapLoginEntityVMToModel', () => {
+   it('should return null when passing loginEntity equals undefined', () => {
+     // Arrange
+     const loginEntity: vm.LoginEntity = undefined;

+     // Act
+     const result = mapLoginEntityVMToModel(loginEntity);

+     // Assert
+     expect(result).toBeNull();
+   });
  });
});
```

- Previous spec will fail because we are not protecting against undefined value, so we have to refactor the implementation:

### ./src/pages/login/mappers.ts
```diff
import * as model from '../../rest-api/model';
import * as vm from './viewModel';

- export const mapLoginEntityVMToModel = (loginEntity: vm.LoginEntity): model.LoginEntity => ({
+ export const mapLoginEntityVMToModel = (loginEntity: vm.LoginEntity): model.LoginEntity => (
+   Boolean(loginEntity) ?
+     {
        ...loginEntity,
+     } :
+     null
- });
+ );
```

- Add spec passing `null` value:

### ./src/pages/login/mappers.spec.ts
```diff
...

+   it('should return null when passing loginEntity equals null', () => {
+     // Arrange
+     const loginEntity: vm.LoginEntity = null;

+     // Act
+     const result = mapLoginEntityVMToModel(loginEntity);

+     // Assert
+     expect(result).toBeNull();
+   });
  });
});
```

- Add spec passing `empty` values:

### ./src/pages/login/mappers.spec.ts
```diff
...

+   it('should return same values when passing loginEntity equals empty values', () => {
+     // Arrange
+     const loginEntity: vm.LoginEntity = {
+       login: '',
+       password: '',
+     };

+     // Act
+     const result = mapLoginEntityVMToModel(loginEntity);

+     // Assert
+     expect(result).toEqual({
+       login: '',
+       password: '',
+     });
+   });
  });
});
```

- Add spec passing `values`:

### ./src/pages/login/mappers.spec.ts
```diff
...

+   it('should return same values when passing loginEntity with values', () => {
+     // Arrange
+     const loginEntity: vm.LoginEntity = {
+       login: 'test login',
+       password: 'test password',
+     };

+     // Act
+     const result = mapLoginEntityVMToModel(loginEntity);

+     // Assert
+     expect(result).toEqual({
+       login: loginEntity.login,
+       password: loginEntity.password,
+     });
+   });
  });
});
```

- It looks like we've finished this mapper. Looking through the app, we found `members mappers` so let's add a test file for them:

### ./src/pages/members/list/mappers.spec.ts
```javascript
import { mapMemberListModelToVM } from './mappers';

describe('pages/members/list/mappers specs', () => {
  describe('mapMemberListModelToVM', () => {

  });
});
```

- Add spec passing `undefined` value:

### ./src/pages/members/list/mappers.spec.ts
```diff
+ import * as model from '../../../rest-api/model';
import { mapMemberListModelToVM } from './mappers';

describe('pages/members/list/mappers specs', () => {
  describe('mapMemberListModelToVM', () => {
+   it('should return empty array when passing members equals undefined', () => {
+     // Arrange
+     const members: model.Member[] = undefined;

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     expect(result).toEqual([]);
+   });
  });
});
```

- Previous spec will fail because we are not protecting against undefined value, so we have to refactor the implementation:

### ./src/pages/members/list/mappers.ts
```diff
import * as model from '../../../rest-api/model';
import * as vm from './viewModel';

export const mapMemberListModelToVM = (members: model.Member[]): vm.Member[] => (
- members.map(mapMemberModelToVM)
+ Array.isArray(members) ?
+   members.map(mapMemberModelToVM) :
+   []
);

const mapMemberModelToVM = (member: model.Member): vm.Member => ({
  id: member.id,
  name: member.login,
  avatarUrl: member.avatar_url,
});
```

- Add spec passing `null` value:

### ./src/pages/members/list/mappers.spec.ts
```diff
...
+   it('should return empty array when passing members equals null', () => {
+     // Arrange
+     const members: model.Member[] = null;

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     expect(result).toEqual([]);
+   });
  });
});
```

- Add spec passing `empty array` value:

### ./src/pages/members/list/mappers.spec.ts
```diff
...
+   it('should return empty array when passing members equals emtpy array', () => {
+     // Arrange
+     const members: model.Member[] = [];

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     expect(result).toEqual([]);
+   });
  });
});
```

- Add spec passing `one item`:

### ./src/pages/members/list/mappers.spec.ts
```diff
+ import * as vm from './viewModel';
...
+   it('should return array with one item when passing members equals array with one item', () => {
+     // Arrange
+     const members: model.Member[] = [
+       {
+         id: 1,
+         login: 'test login',
+         avatar_url: 'test avatar_url',
+       },
+     ];

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     const expectedResult: vm.Member[] = [
+       {
+         id: 1,
+         name: 'test login',
+         avatarUrl: 'test avatar_url',
+       },
+     ];
+     expect(result).toEqual(expectedResult);
+   });
  });
});
```

- Add spec passing `two items`:

### ./src/pages/members/list/mappers.spec.ts
```diff
...
+   it('should return array with two items when passing members equals array with two items', () => {
+     // Arrange
+     const members: model.Member[] = [
+       {
+         id: 1,
+         login: 'test login 1',
+         avatar_url: 'test avatar_url 1',
+       },
+       {
+         id: 2,
+         login: 'test login 2',
+         avatar_url: 'test avatar_url 2',
+       },
+     ];

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     const expectedResult: vm.Member[] = [
+       {
+         id: 1,
+         name: 'test login 1',
+         avatarUrl: 'test avatar_url 1',
+       },
+       {
+         id: 2,
+         name: 'test login 2',
+         avatarUrl: 'test avatar_url 2',
+       },
+     ];
+     expect(result).toEqual(expectedResult);
+   });
  });
});
```

- We could add specs to `login validations` to ensure that it's working as we expect:

> NOTE: `lc-form-validation` is an external lib that it provides their own specs.
> This specs maybe are unnecessary but if we implement custom validators we need specs for sure.

### ./src/pages/login/validations.spec.ts
```javascript
import { validations } from './validations';

describe('pages/login/validations specs', () => {
  it('should return undefined validation result when passing wrong field', () => {
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
      });
  });
});
```

- If we update the test so that it fails:

### ./src/pages/login/validations.spec.ts
```diff
import { validations } from './validations';

describe('pages/login/validations specs', () => {
  it('should return undefined validation result when passing wrong field', () => {
    // Arrange
    const vm = {
      login: '',
    };

    const field = 'login';
    const value = 'test';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
-       expect(fieldValidationResult).toBeUndefined();
+       expect(fieldValidationResult).toBeNull();
      });
  });
});
```

- We see something is wrong but all specs is passing, how is that? It's because we are testing asynchronous specs, the problem is that the test will complete as soon as promise completes, so Jest is not waiting to expect result.

> [Asynchronous Jest](https://facebook.github.io/jest/docs/en/asynchronous.html)

- A simple way to solve it, is by using the `done` method:

### ./src/pages/login/validations.spec.ts
```diff
import { validations } from './validations';

describe('pages/login/validations specs', () => {
- it('should return undefined validation result when passing wrong field', () => {
+ it('should return undefined validation result when passing wrong field', (done) => {
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
        expect(fieldValidationResult).toBeNull();
+       done();
      });
  });
});
```

- Now, we could restore the spec:

### ./src/pages/login/validations.spec.ts
```diff
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
-       expect(fieldValidationResult).toBeNull();
+       expect(fieldValidationResult).toBeUndefined();
        done();
      });
  });
});
```

- Add `failed validation result` for login:

### ./src/pages/login/validations.spec.ts
```diff
...
+ it('should retun failed validation result when passing login field with empty value', (done) => {
+   // Arrange
+   const vm = {
+     login: '',
+   };

+   const field = 'login';
+   const value = '';

+   // Act
+   validations.validateField(vm, field, value)
+     .then((fieldValidationResult) => {
+       // Assert
+       expect(fieldValidationResult.succeeded).toBeFalsy();
+       expect(fieldValidationResult.errorMessage).toEqual('Please fill in this mandatory field.');
+       done();
+     });
+ });
});
```

- Add `succeeded validation result` for login:

### ./src/pages/login/validations.spec.ts
```diff
...
+ it('should retun succeeded validation result when passing login field with value', (done) => {
+   // Arrange
+   const vm = {
+     login: '',
+   };

+   const field = 'login';
+   const value = 'test value';

+   // Act
+   validations.validateField(vm, field, value)
+     .then((fieldValidationResult) => {
+       // Assert
+       expect(fieldValidationResult.succeeded).toBeTruthy();
+       expect(fieldValidationResult.errorMessage).toEqual('');
+       done();
+     });
+ });
});
```

- Add `failed validation result` for password:

### ./src/pages/login/validations.spec.ts
```diff
...
+ it('should retun failed validation result when passing password field with empty value', (done) => {
+   // Arrange
+   const vm = {
+     password: '',
+   };

+   const field = 'password';
+   const value = '';

+   // Act
+   validations.validateField(vm, field, value)
+     .then((fieldValidationResult) => {
+       // Assert
+       expect(fieldValidationResult.succeeded).toBeFalsy();
+       expect(fieldValidationResult.errorMessage).toEqual('Please fill in this mandatory field.');
+       done();
+     });
+ });
});
```

- Add `succeeded validation result` for password:

### ./src/pages/login/validations.spec.ts
```diff
...
+ it('should retun succeeded validation result when passing password field with value', (done) => {
+   // Arrange
+   const vm = {
+     password: '',
+   };

+   const field = 'password';
+   const value = 'test value';

+   // Act
+   validations.validateField(vm, field, value)
+     .then((fieldValidationResult) => {
+       // Assert
+       expect(fieldValidationResult.succeeded).toBeTruthy();
+       expect(fieldValidationResult.errorMessage).toEqual('');
+       done();
+     });
+ });
});
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
