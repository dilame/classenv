function upperSnakeCase(str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toUpperCase();
}

const FALSEY_VALUES = ['false', '0'];

export function Env(variableName?: string | string[]): any {
  return (target: any, key: string) => {
    variableName ??= upperSnakeCase(key);

    let envVarValue: string | undefined = void 0;
    if (Array.isArray(variableName)) {
      const existingKey = variableName.find(
        (k) => typeof process.env[k] === 'string',
      );
      if (typeof existingKey === 'string') {
        envVarValue = process.env[existingKey];
      }
    } else {
      envVarValue = process.env[variableName];
    }

    let outValue: string;
    if (typeof envVarValue === 'undefined') {
      if (typeof target[key] === 'undefined') {
        throw new Error(`CLASSENV: Environment variable ${JSON.stringify(variableName)} is undefined and default value for field ${JSON.stringify(key)} not set`);
      } else {
        outValue = target[key];
      }
    } else {
      outValue = envVarValue;
    }
    const DesignType = (Reflect as any).getMetadata('design:type', target, key);
    if ([String, Number, Boolean].includes(DesignType)) {
      if (
        DesignType === Boolean &&
        FALSEY_VALUES.includes(outValue.toLowerCase())
      ) {
        outValue = '';
      }
      outValue = DesignType(outValue);
      Object.defineProperty(target, key, {
        value: outValue,
        writable: false,
        enumerable: true,
        configurable: true,
      });
    } else {
      throw new Error(
        `CLASSENV: ${key} type must be one of [String, Number, Boolean]. Got ${DesignType.name}`,
      );
    }
  };
}
