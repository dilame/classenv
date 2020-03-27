Describe your environment variables contract with TypeScript class.

Built-in support for type-casting.

`.env`
```
IS_SOMETHING_ENABLED=1
```

```typescript
import { Env } from 'classenv';

class Environment {
  @Env('IS_SOMETHING_ENABLED')
  static isEnabledStr: string;

  @Env('IS_SOMETHING_ENABLED')
  static isEnabledNmbr: number;

  @Env('IS_SOMETHING_ENABLED')
  static isEnabledBln: boolean;

  @Env() // Auto UPPER_SNAKE_CASE conversion supported
  static isSomethingEnabled: number
}

console.log(typeof Environment.isEnabledStr, Environment.isEnabledStr) // string 1
console.log(typeof Environment.isEnabledNmbr, Environment.isEnabledNmbr) // number 1
console.log(typeof Environment.isEnabledBln, Environment.isEnabledBln) // boolean true
```

`@Env` property data type should be scalar (string, number or boolean).

If variable is declared but not actually exist you'll get the runtime error.

Env property is read only.

```typescript
Test.isEnabledBln = false;
// TypeError: Cannot assign to read only property 'isEnabledBln' of function 'class Test{}'
```