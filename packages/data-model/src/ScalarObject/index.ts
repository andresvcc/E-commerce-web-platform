import { GraphQLScalarType, Kind } from 'graphql';

function parseLiteralObject(ast) {
  switch (ast.kind) {
    case Kind.BOOLEAN:
    case Kind.STRING:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(ast.value);
    case Kind.LIST:
      return ast.values.map(parseLiteralObject);
    case Kind.OBJECT:
      return ast.fields.reduce((accumulator, field) => {
        accumulator[field.name.value] = parseLiteralObject(field.value);
        return accumulator;
      }, {});
    case Kind.NULL:
      return null;
    default:
      throw new Error(`Unexpected kind in parseLiteral: ${ast.kind}`);
  }
}

export const ScalarObject = new GraphQLScalarType({
  name: 'ScalarObjectType',
  description: 'Any value.',
  parseValue: (value) => value,
  parseLiteral: parseLiteralObject,
  serialize: (value) => value,
});

function parseLiteralStringOrNumber(ast) {
  switch (ast.kind) {
    case Kind.STRING:
      return ast.value;
    case Kind.INT:
    case Kind.NULL:
      return null;
    default:
      throw new Error(`Unexpected kind in parseLiteral: ${ast.kind}`);
  }
}

export const StringOrNumber = new GraphQLScalarType({
  name: 'stringOrNumber',
  description: 'Any value.',
  parseValue: (value) => value,
  parseLiteral: parseLiteralStringOrNumber,
  serialize: (value) => value,
});

export type stringOrNumber = string | number;
