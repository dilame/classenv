export function Env(inputName?: string): any {
  return (target, key: string) => {
    const name =
      inputName ??
      key // upper-snake-case conversion
        .split(/(?=[A-Z])/)
        .join('_')
        .toUpperCase();

    let value = process.env[name];
    if (typeof value === 'undefined') {
      if (typeof target[key] === 'undefined') {
        throw new Error(`Environment variable ${name} is undefined`);
      } else {
        value = target[key];
      }
    }
    const designType = (Reflect as any).getMetadata('design:type', target, key);
    if ([String, Number, Boolean].includes(designType)) {
      Object.defineProperty(target, key, {
        value: designType(value),
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
