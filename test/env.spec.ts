import 'reflect-metadata';
import { Env } from '../src';

describe('env decorator', () => {
  process.env.TEST_TEST = '1';
  process.env.BOOLEAN_FALSE_STRING = 'false';
  process.env.BOOLEAN_ZERO_STRING = '0';

  class Environment {
    @Env()
    testTest: number;

    @Env('TEST_TEST')
    static testStr: string;

    @Env('TEST_TEST')
    static testNmbr: number;

    @Env('TEST_TEST')
    static testBln: boolean;

    @Env()
    static testTest: number;

    @Env()
    static withDefault: string = 'yeah its me'

    @Env()
    static booleanFalseString: boolean;

    @Env()
    static booleanZeroString: boolean;
  }

  it('should throw when variable not exists', () => {
    expect(() => Env('not-existing')()).toThrow();
  });

  it('should cast types', () => {
    expect(typeof Environment.testStr).toBe('string');
    expect(typeof Environment.testNmbr).toBe('number');
    expect(typeof Environment.testBln).toBe('boolean');
    expect(typeof Environment.testTest).toBe('number');
  });

  it('should auto convert to upper-snake-case', () => {
    expect(typeof Environment.testTest).toBe('number');
  })

  it('should not throw when default value is set', () => {
    expect(Environment.withDefault).toBe('yeah its me');
  })

  it('should throw when trying to mutate', () => {
    expect(() => (Environment.testStr = '1')).toThrow();
  });

  it('should support instance properties', () => {
    const env = new Environment();
    expect(typeof env.testTest).toBe('number');
  });

  it('should cast strings "false", "FALSE" and "0" to boolean for boolean types', () => {
    expect(Environment.booleanFalseString).toStrictEqual(false);
    expect(Environment.booleanZeroString).toStrictEqual(false);
  });
});
