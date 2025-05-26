import path from 'node:path';
import Ajv from 'ajv';
import betterAjvErrors from '../../';
import { getSchemaAndData } from '../../test-helpers';

const fixturePath = path.join(__dirname, '..', '__fixtures__');

describe('Main', () => {
  it('should support js output format for default errors', async () => {
    const [schema, data] = await getSchemaAndData('default', fixturePath);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBeFalsy();

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });

  it('should support js output format for required errors', async () => {
    const [schema, data] = await getSchemaAndData('required', fixturePath);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBeFalsy();

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });

  it('should support js output format for additionalProperties errors', async () => {
    const [schema, data] = await getSchemaAndData(
      'additionalProperties',
      fixturePath
    );

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBeFalsy();

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });

  it('should support js output format for enum errors', async () => {
    const [schema, data] = await getSchemaAndData('enum', fixturePath);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBeFalsy();

    const res = betterAjvErrors(schema, data, validate.errors, {
      format: 'js',
    });
    expect(res).toMatchSnapshot();
  });
});
