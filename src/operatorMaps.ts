// src/operatorMaps.ts
export const operatorMap: Record<string, string> = {
  '=': '=',
  '!=': '!=',
  contains: 'ilike',
  '!contains': 'not ilike',
  '>': '>',
  '<': '<',
  '>=': '>=',
  '<=': '<=',
  in: 'in',
  '!in': 'not in',
};

export const inverseOperatorMap: Record<string, string> = Object.fromEntries(
  Object.entries(operatorMap).map(([key, value]) => [value, key])
);