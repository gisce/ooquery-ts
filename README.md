# OOQuery (typescript)

OOQuery is a lightweight library that converts query structures from JSON
format (commonly used with tools like react-querybuilder) to ERP domain
notation (such as Odoo/OpenERP) and vice versa.

This library is designed to be **dependency-free** and **lightweight**.
It is written in TypeScript and can be used in both TypeScript and JavaScript
projects.

## Features

- **Convert JSON queries to ERP domains**: Easily build ERP-compatible domain filters.
- **Convert ERP domains to JSON**: Transform ERP domain filters into a format compatible with react-querybuilder.

## Installation

```bash
npm install ooquery
```

## Usage

### Convert JSON to ERP domain

```typescript
import { convertToDomain } from 'ooquery';

const query = {
  combinator: 'and',
  rules: [
    { field: 'name', operator: 'contains', value: 'John' },
    { field: 'age', operator: '>', value: 30 }
  ]
};

const domain = convertToDomain(query);
console.log(domain);
// Output: [['name', 'ilike', 'John'], ['age', '>', 30]]
```

### Convert ERP domain to JSON

```typescript
import { convertFromDomain } from 'ooquery';

const domain = ['|', ['status', '=', 'active'], ['status', '=', 'pending']];

const query = convertFromDomain(domain);
console.log(query);
// Output:
// {
//   combinator: 'or',
//   rules: [
//     { field: 'status', operator: 'equals', value: 'active' },
//     { field: 'status', operator: 'equals', value: 'pending' }
//   ]
// }
```

## Development

### Testing

The library uses Vitest for unit testing.

To execute tests:

```bash
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Developed by [GISCE-TI](https://github.com/gisce) team 🩵
