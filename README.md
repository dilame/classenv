# classenv

A perfect typescript class environment variables library.

- Strongly-typed declarative class containing your environment data
- Type-casting using TypeScript metadata reflection
- Auto UPPER_SNAKE_CASE conversion
- Throws runtime error if variable doesn't exist
- Default values support
- Makes decorated properties read-only in runtime
- Supports both static and instance properties


## Description
Let's pretend we have very simple

**.env**
```
IS_SOMETHING_ENABLED=1
```

How can we describe it using **classenv**

**environment.ts**
```typescript
import { Env } from 'classenv';

export class Environment {
  @Env() // Auto UPPER_SNAKE_CASE conversion
  static isSomethingEnabled: number; // process.env.IS_SOMETHING_ENABLED

  @Env() // Instance properties supported
  isSomethingEnabled: number;

  @Env() // Won't throw, because got default value
  static withDefault: string = 'yeah its me'

  @Env('IS_SOMETHING_ENABLED')
  static isEnabledStr: string;

  @Env('IS_SOMETHING_ENABLED')
  static isEnabledNmbr: number;

  @Env('IS_SOMETHING_ENABLED')
  static isEnabledBln: boolean;
}
```

`@Env` property data type should be scalar (string, number or boolean).

**main.ts**
```typescript
import {Environment} from './environment.ts'

console.log(typeof Environment.isEnabledStr, Environment.isEnabledStr)
 // string 1

console.log(typeof Environment.isEnabledNmbr, Environment.isEnabledNmbr)
 // number 1

console.log(typeof Environment.isEnabledBln, Environment.isEnabledBln)
 // boolean true

console.log(typeof Environment.isSomethingEnabled, Environment.isSomethingEnabled)
 // number 1

Environment.isEnabledBln = false;
// TypeError: Cannot assign to read only property 'isEnabledBln' of function 'class Test{}'


// Let's check instance properties
const env = new Environment();

console.log(env.isSomethingEnabled) // 1

```

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