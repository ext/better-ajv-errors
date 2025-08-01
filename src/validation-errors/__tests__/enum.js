import path from 'node:path';
import { parse } from '@humanwhocodes/momoa';
import { getSchemaAndData } from '../../test-helpers';
import EnumValidationError from '../enum';

const fixturePath = path.join(__dirname, '..', '__fixtures__');

describe('Enum', () => {
  describe('when value is an object', () => {
    let schema, data, jsonRaw, jsonAst;
    beforeAll(async () => {
      [schema, data] = await getSchemaAndData('enum', fixturePath);
      jsonRaw = JSON.stringify(data, null, 2);
      jsonAst = parse(jsonRaw);
    });

    it('prints correctly for enum prop', () => {
      const error = new EnumValidationError(
        {
          keyword: 'enum',
          dataPath: '/id',
          schemaPath: '#/enum',
          params: { allowedValues: ['foo', 'bar'] },
          message: `should be equal to one of the allowed values`,
        },
        { data, schema, jsonRaw, jsonAst }
      );

      expect(error.print()).toMatchSnapshot();
    });

    it('prints correctly for no levenshtein match', () => {
      const error = new EnumValidationError(
        {
          keyword: 'enum',
          dataPath: '/id',
          schemaPath: '#/enum',
          params: { allowedValues: ['one', 'two'] },
          message: `should be equal to one of the allowed values`,
        },
        { data, schema, jsonRaw, jsonAst }
      );

      expect(error.print()).toMatchSnapshot();
    });

    it('prints correctly for empty value', () => {
      const error = new EnumValidationError(
        {
          keyword: 'enum',
          dataPath: '/id',
          schemaPath: '#/enum',
          params: { allowedValues: ['foo', 'bar'] },
          message: `should be equal to one of the allowed values`,
        },
        { data, schema, jsonRaw, jsonAst }
      );

      expect(error.print(schema, { id: '' })).toMatchSnapshot();
    });
  });

  describe('when value is a primitive', () => {
    let schema, data, jsonRaw, jsonAst;
    beforeAll(async () => {
      [schema, data] = await getSchemaAndData('enum-string', fixturePath);
      jsonRaw = JSON.stringify(data, null, 2);
      jsonAst = parse(jsonRaw);
    });

    it('prints correctly for enum prop', () => {
      const error = new EnumValidationError(
        {
          keyword: 'enum',
          dataPath: '',
          schemaPath: '#/enum',
          params: {
            allowedValues: ['foo', 'bar'],
          },
          message: 'should be equal to one of the allowed values',
        },
        { data, schema, jsonRaw, jsonAst }
      );

      expect(error.print()).toMatchSnapshot();
    });

    it('prints correctly for no levenshtein match', () => {
      const error = new EnumValidationError(
        {
          keyword: 'enum',
          dataPath: '',
          schemaPath: '#/enum',
          params: {
            allowedValues: ['one', 'two'],
          },
          message: 'should be equal to one of the allowed values',
        },
        { data, schema, jsonRaw, jsonAst }
      );

      expect(error.print()).toMatchSnapshot();
    });

    it('prints correctly for empty value', () => {
      const error = new EnumValidationError(
        {
          keyword: 'enum',
          dataPath: '',
          schemaPath: '#/enum',
          params: {
            allowedValues: ['foo', 'bar'],
          },
          message: 'should be equal to one of the allowed values',
        },
        { data, schema, jsonRaw, jsonAst }
      );

      expect(error.print(schema, '')).toMatchSnapshot();
    });
  });
});
