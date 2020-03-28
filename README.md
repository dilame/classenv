# classenv

A perfect typescript class environment variables library.

- Strongly-typed declarative class containing your environment data
- Type-casting using TypeScript metadata reflection
- Auto UPPER_SNAKE_CASE conversion
- Throws runtime error if variable doesn't exist
- Default values support
- Makes decorated properties read-only in runtime

**.env**
```
IS_SOMETHING_ENABLED=1
```

```typescript
import { Env } from 'classenv';

class Environment {
  @Env() // Auto UPPER_SNAKE_CASE conversion supported
  static isSomethingEnabled: number;

  @Env() // Won't throw, because got default value
  static withDefault: string = 'yeah its me'

  @Env('IS_SOMETHING_ENABLED')
  static isEnabledStr: string;

  @Env('IS_SOMETHING_ENABLED')
  static isEnabledNmbr: number;

  @Env('IS_SOMETHING_ENABLED')
  static isEnabledBln: boolean;
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

## Dependencies

###reflect-metadata
```
npm i reflect-metadata
```

And then import it somewhere close to your entry point (`index.ts`/`main.ts`/etc...). 
Should be imported before any of your environment classes.

```typescript
import 'reflect-metadata';
```

###tsconfig.json

These settings should be enabled

```
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```