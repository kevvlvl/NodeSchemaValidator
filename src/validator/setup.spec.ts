import {initAjv} from './setup';
import Ajv, {ValidateFunction} from 'ajv';
import {schema, schemaWithErrors} from './types';

describe('Ajv validation', () => {

    let ajv: Ajv;
    let validator: ValidateFunction;

    beforeEach(() => {
        ajv = initAjv();
    });

    it('returns is valid if value is above or equals min or below or equals max', () => {

        validator = ajv.compile(schema);
        const valid = validator({ amount: 500 });

        expect(valid)
            .toBe(true);
        expect(validator.errors)
            .toBeNull();
    });

    it('returns a custom schema error if value is below the minimum', () => {

        validator = ajv.compile(schemaWithErrors);
        const valid = validator({ amount: 50 });

        expect(valid)
            .toBe(false);
        expect(validator.errors?.[0].message).toBe(
            'amount must be above or equals 100'
        );
    });

    it('returns a keyword error if value is below the minimum', () => {

        validator = ajv.compile(schema);

        const valid = validator({ amount: 50 });

        expect(valid)
            .toBe(false);
        expect(validator.errors?.length)
            .toBe(1)
        expect(validator.errors && validator.errors[0].keyword)
            .toBe('validateMinimum')
        expect(validator.errors && validator.errors[0].message)
            .toContain('ERROR VALIDATE_MINIMUM')
        expect(validator.errors && validator.errors[0].params.keyword)
            .toBe('errorMessage')
        expect(validator.errors && validator.errors[0].params.min)
            .toBeDefined();
    });

    it('returns a custom schema error if value is above the maximum', () => {

        validator = ajv.compile(schemaWithErrors);
        const valid = validator({ amount: 20000 });

        expect(valid)
            .toBe(false);
        expect(validator.errors?.[0].message)
            .toBe('amount must be below or equals 1000');
    });

    it('returns a keyword error if value is above the maximum', () => {

        validator = ajv.compile(schema);

        const valid = validator({ amount: 20000 });

        expect(valid)
            .toBe(false);
        expect(validator.errors?.length)
            .toBe(1)
        expect(validator.errors && validator.errors[0].keyword)
            .toBe('validateMaximum')
        expect(validator.errors && validator.errors[0].message)
            .toContain('ERROR VALIDATE_MAXIMUM')
        expect(validator.errors && validator.errors[0].params.keyword)
            .toBe('errorMessage')
        expect(validator.errors && validator.errors[0].params.max)
            .toBeDefined();
    });
});