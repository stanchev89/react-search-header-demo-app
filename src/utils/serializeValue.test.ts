import { describe, test } from 'vitest';
import { serializeValue } from './serializeValue';

describe('serializeValue', () => {
  test('string', () => {
    expect(serializeValue('test', 'string')).toBe('test');
  });

  test('number', () => {
    expect(serializeValue('1', 'number')).toBe(1);
  });

  test('boolean', () => {
    expect(serializeValue('true', 'boolean')).toBe(true);
  });

  test('default', () => {
    expect(serializeValue('test', 'test')).toBe('test');
  });
});
