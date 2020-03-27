# classenv

A perfect typescript environment variables library.

- Strongly-typed declarative class containing your environment data
- Type-casting using TypeScript metadata reflection
- Auto UPPER_SNAKE_CASE conversion
- 0 dependencies
- Throws runtime error if variable doesn't exist
- Default values support
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
  static isSomethingEnabled: number;

  @Env() // Won't throw, because got default value
  static withDefault: string = 'yeah its me'
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
