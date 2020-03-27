import 'reflect-metadata';
import { Env } from '../src';

describe('env decorator', () => {
  process.env.TEST_TEST = '1';

  class Environment {
    @Env('TEST_TEST')
    static testStr: string;

    @Env('TEST_TEST')
    static testNmbr: number;

    @Env('TEST_TEST')
    static testBln: boolean;

    @Env()
    static testTest: number;
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

  it('should throw when trying to mutate', () => {
    expect(() => (Environment.testStr = '1')).toThrow();
  });
});
