function upperSnakeCase(str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toUpperCase();
}

export function Env(variableName?: string): any {
  return (target, key: string) => {
    variableName ??= upperSnakeCase(key);

    let value: any = process.env[variableName];
    if (typeof value === 'undefined') {
      if (typeof target[key] === 'undefined') {
        throw new Error(`Environment variable ${variableName} is undefined`);
      } else {
        value = target[key];
      }
    }
    const designType = (Reflect as any).getMetadata('design:type', target, key);
    if ([String, Number, Boolean].includes(designType)) {
      if (designType === Boolean && ['false', 'FALSE', '0'].includes(value)) {
        value = false;
      } else {
        value = designType(value);
      }
      Object.defineProperty(target, key, {
        value,
        writable: false,
        enumerable: true,
        configurable: true,
      });
    } else {
      throw new Error(
        `${key} type must be one of [String, Number, Boolean]. Got ${designType.name}`,
      );
    }
  };
}
