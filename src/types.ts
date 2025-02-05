export type Rule = {
  field: string;
  operator: string;
  value: any;
};

export type Query = {
  combinator: 'and' | 'or';
  rules: (Rule | Query)[];
};
