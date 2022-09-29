# TypeScript environment variable decorator

A perfect TypeScript environment variables library.

- Strongly-typed declarative class containing your environment data
- Supports both static and instance properties
- Type-casting using TypeScript metadata reflection
- Auto UPPER_SNAKE_CASE conversion
- Converts environment values "FALSE", "false", "0" to false for boolean types
- Throws runtime error if variable doesn't exist
- Supports default values
- Makes decorated properties read-only in runtime
- ❤️ You will like it

## 💼 Use cases 

### 🪞 Type-casting Using TypeScript metadata reflection

Just specify class field type and `classenv` will cast the environment variable string value to the value of your field type. 
Only `string`, `number`, and `boolean` is supported.

```ts
process.env['PORT'] = '3000';

class ServerSettings {
  // Field name will be auto-converted to POSTGRES_URL for checking the process.env
  @Env('PORT')
  portNumber!: number; // 3000
  @Env('PORT')
  portString!: string; // "3000"
  @Env('PORT') // Why not?!
  portBoolean!: boolean; // true
}
```

### 🐍 Auto UPPER_SNAKE_CASE from camelCase conversion

No need to manually specify the environment variable name

```ts
process.env['POSTGRES_URL'] = 'postgres://127.0.0.1:5432';

class PostgresAdapter {
  // Field name will be auto-converted to POSTGRES_URL for checking the process.env
  @Env()
  postgresUrl!: string; // postgres://127.0.0.1:5432
}
```

### 🫙 Use default value in case of environment variable absence

```ts
class ServerSettings {
  @Env()
  port: number = 3000;
}
```

### 🚔 Throw runtime error if no value provided

One could say `"It's a bad practice to throw runtime error"`, and it's a right assertion, but not in this case.
Most of the time your application can't work without all the environment variables.
You don't want to run application in an indefinite state and then debug these strange things.
So `classenv` will throw runtime error and your application should shut down with an informative message of what's going wrong.

```ts
class PostgresAdapter {
  @Env()
  // Will throw a runtime error, because your app can't work without DB connection
  postgresUrl!: string;
}
```

But in case the environment variable is not required – you can just assign a default value for the field, and it will not throw.

```ts
class PostgresAdapter {
  @Env()
  postgresUrl: string = 'postgres://127.0.0.1:5432'; // Everything is ok here
}
```

### 🔘 Pick one of the name from array

```ts
process.env['POSTGRES_URL'] = 'postgres://127.0.0.1:5432';

class PostgresAdapter {
  @Env(['POSTGRESQL_URI', 'PG_URL', 'POSTGRES_URL'])
  url!: string; // postgres://127.0.0.1:5432
}
```

### ✨ `static` field also supported

```ts
process.env['PORT'] = '3000';

class ServerSettings {
  @Env()
  static port: number = 3000;
}
```

### 1️⃣ Boolean type casting 0️⃣

If value is `0` of `false` in any case (`FaLsE` also included, since it's `.toLowerCase()`'d under the hood) – it becomes `false`.
Otherwise - `true`

```ts
process.env['FALSE'] = 'false';
process.env['ZERO'] = '0';
process.env['TRUE'] = 'true';
process.env['ANYTHING'] = 'Jast a random string';

class Common {
  @Env()
  static FALSE!: boolean; // false
  @Env()
  static zero!: boolean; // false
  @Env()
  static TRUE!: boolean; // true
  @Env()
  static anything!: boolean; // true
}
```

### 🛑 `@Env()` decorated properties are read-only in runtime

Environment is something established from outside, so you definitely should not modify it in your application.


```ts
process.env['PORT'] = '3000';

class ServerSettings {
  @Env()
  static port!: number;
}

// TypeError: Cannot assign to read only property 'port' of function 'class ServerSettings{}'

ServerSettings.port = 5000;
```

## ❗Dependencies❗

It is important, `classenv` can not work without it.

### reflect-metadata

```
npm i reflect-metadata
```

And then import it somewhere close to your entry point (`index.ts`/`main.ts`/etc...).
Should be imported before any of your environment classes.

```typescript
import 'reflect-metadata';
```

### tsconfig.json

These settings should be enabled

```
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```
