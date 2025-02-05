import { describe, it, expect } from 'vitest';
import { convertFromDomain } from '../src/convertFromDomain';

describe('convertFromDomain', () => {
  it('should convert a simple AND domain', () => {
    const domain = [['name', 'ilike', 'John'], ['age', '>', 30]];
    const expected = {
      combinator: 'and',
      rules: [
        { field: 'name', operator: 'contains', value: 'John' },
        { field: 'age', operator: '>', value: 30 }
      ]
    };
    expect(convertFromDomain(domain)).toEqual(expected);
  });

  it('should convert an OR domain', () => {
    const domain = ['|', ['status', '=', 'active'], ['status', '=', 'pending']];
    const expected = {
      combinator: 'or',
      rules: [
        { field: 'status', operator: '=', value: 'active' },
        { field: 'status', operator: '=', value: 'pending' }
      ]
    };
    expect(convertFromDomain(domain)).toEqual(expected);
  });
});

