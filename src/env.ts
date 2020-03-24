export function Env(name: string): any {
  if (typeof process.env[name] === 'undefined') {
    throw new Error(`Environment variable ${name} is undefined`);
  }
  return (target, key: string) => {
    const designType = Reflect.getMetadata('design:type', target, key);
    if ([String, Number, Boolean].includes(designType)) {
      Object.defineProperty(target, key, {
        value: designType(process.env[name]),
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
