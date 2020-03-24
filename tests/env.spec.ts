import 'reflect-metadata';
import { Env } from '../src';

describe('env decorator', () => {
  process.env.test = '1';

  class Environment {
    @Env('test')
    static testStr: string;

    @Env('test')
    static testNmbr: number;

    @Env('test')
    static testBln: boolean;
  }

  it('should throw when variable not exists', () => {
    expect(() => Env('not-existing')).toThrow();
  });

  it('should cast types', () => {
    expect(typeof Environment.testStr).toBe('string');
    expect(typeof Environment.testNmbr).toBe('number');
    expect(typeof Environment.testBln).toBe('boolean');
  });

  it('should throw when trying to mutate', () => {
    expect(() => (Environment.testStr = '1')).toThrow();
  });
});
