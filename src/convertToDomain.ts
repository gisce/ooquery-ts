import { Rule, Query } from './types';
import { operatorMap } from './operatorMaps';

export function convertToDomain(query: Query): any[] {
  if (query.rules.length === 0) return [];

  if (query.combinator === 'and') {
    // Retornem una llista d'arrays per AND
    return query.rules.map(rule => processRule(rule));
  }

  // Si és OR, construïm amb agrupament binari
  return buildBinaryExpression('|', query.rules);
}

function processRule(rule: Rule | Query): any {
  if ('rules' in rule) {
    // Si és una subconsulta, recursivament la convertim
    return convertToDomain(rule);
  }

  // Convertim regles simples
  const operator = operatorMap[rule.operator];
  if (!operator) throw new Error(`Operador no suportat: ${rule.operator}`);
  // if operator is "in" and the value is a string, convert it to an array
  // split by comma
  if (operator === 'in' && typeof rule.value === 'string') {
    return [rule.field, operator, rule.value.split(',').map((v: string) => v.trim())];
  }

  return [rule.field, operator, rule.value];  // No emboliquem amb cap array extra
}

function buildBinaryExpression(operator: string, rules: (Rule | Query)[]): any[] {
  if (rules.length === 1) return processRule(rules[0]);

  // Apliquem agrupament binari per OR
  return rules.slice(1).reduce(
    (acc, rule) => [operator, acc, processRule(rule)],
    processRule(rules[0])
  );
}
