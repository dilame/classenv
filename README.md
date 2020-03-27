A perfect typescript environment variables library.

- Type-casting using TypeScript metadata reflection
- Auto UPPER_SNAKE_CASE conversion
- 0 dependencies
- Throws runtime error if variable doesn't exist
- Makes decorated properties read-only in runtime

Built-in support for type-casting.

**.env**
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

 // string 1
console.log(typeof Environment.isEnabledStr, Environment.isEnabledStr)
 // number 1
console.log(typeof Environment.isEnabledNmbr, Environment.isEnabledNmbr)
 // boolean true
console.log(typeof Environment.isEnabledBln, Environment.isEnabledBln)
 // number 1
console.log(typeof Environment.isSomethingEnabled, Environment.isSomethingEnabled)

Environment.isEnabledBln = false;
// TypeError: Cannot assign to read only property 'isEnabledBln' of function 'class Test{}'

```

`@Env` property data type should be scalar (string, number or boolean).
