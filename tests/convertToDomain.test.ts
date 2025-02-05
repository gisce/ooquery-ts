import { describe, it, expect } from 'vitest';
import { convertToDomain } from '../src/convertToDomain';
import { Query } from '../src/types';

describe('convertToDomain', () => {
  it('should convert a simple AND query', () => {
    const query: Query = {
      combinator: 'and',
      rules: [
        { field: 'name', operator: 'contains', value: 'John' },
        { field: 'age', operator: '>', value: 30 }
      ]
    };

    const expected = [['name', 'ilike', 'John'], ['age', '>', 30]];
    expect(convertToDomain(query)).toEqual(expected);
  });

  it('should convert nested OR queries', () => {
    const query: Query = {
      combinator: 'or',
      rules: [
        { field: 'status', operator: '=', value: 'active' },
        { field: 'status', operator: '=', value: 'pending' }
      ]
    };

    const expected = ['|', ['status', '=', 'active'], ['status', '=', 'pending']];
    expect(convertToDomain(query)).toEqual(expected);
  });
  it('should convert more complex queries', () => {
    const query: Query = {
  "combinator": "and",
      "rules": [
        {
          "field": "firstName",
          "value": "Stev",
          "operator": "contains"
        },
        {
          "field": "lastName",
          "value": "Vai, Vaughan",
          "operator": "in"
        },
        {
          "field": "age",
          "operator": ">",
          "value": "28"
        },
        {
          "combinator": "or",
          "rules": [
            {
              "field": "isMusician",
              "operator": "=",
              "value": true
            },
            {
              "field": "instrument",
              "operator": "=",
              "value": "Guitar"
            }
          ]
        },
        {
          "field": "birthdate",
          "operator": ">=",
          "value": "2025-02-05"
        }
      ]
    }
    const expected = [
      [ 'firstName', 'ilike', 'Stev' ],
      [ 'lastName', 'in', [ 'Vai', 'Vaughan' ] ],
      [ 'age', '>', '28' ],
      [ '|', [ 'isMusician', '=', true ], [ 'instrument', '=', 'Guitar' ] ],
      [ 'birthdate', '>=', '2025-02-05' ]
    ];
    expect(convertToDomain(query)).toEqual(expected);
  });
});
