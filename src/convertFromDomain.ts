import { Rule, Query } from './types';
import { inverseOperatorMap } from './operatorMaps';

export function convertFromDomain(domain: any[]): Query {
  return optimizeQuery(parseDomain(domain));
}

function parseDomain(domain: any[]): Query {
  const rules: (Rule | Query)[] = [];
  let i = 0;

  while (i < domain.length) {
    const element = domain[i];
    if (element === '|') {
      rules.push({ combinator: 'or', rules: [processElement(domain[i + 1]), processElement(domain[i + 2])] });
      i += 3;
    } else if (element === '&') {
      rules.push({ combinator: 'and', rules: [processElement(domain[i + 1]), processElement(domain[i + 2])] });
      i += 3;
    } else if (Array.isArray(element)) {
      rules.push(processElement(element));
      i++;
    } else {
      i++;
    }
  }
  return { combinator: 'and', rules };
}

function processElement(element: any): Rule | Query {
  if (Array.isArray(element)) {
    const [field, domainOperator, value] = element;
    const operator = inverseOperatorMap[domainOperator];
    if (!operator) throw new Error(`Operador no suportat: ${domainOperator}`);
    return { field, operator, value };
  } else if ('combinator' in element) {
    return optimizeQuery(element as Query);
  }
  throw new Error(`Element desconegut: ${element}`);
}

function optimizeQuery(query: Query): Query {
  if (query.rules.length === 1) return query.rules[0] as Query;
  const optimizedRules = query.rules.flatMap(rule => ('combinator' in rule && rule.combinator === query.combinator)
    ? optimizeQuery(rule).rules
    : [rule]);
  return { combinator: query.combinator, rules: optimizedRules };
}

