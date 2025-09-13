import Ajv, {KeywordDefinition, SchemaValidateFunction} from "ajv";
import {AnySchemaObject, DataValidationCxt} from "ajv/lib/types";
import {ERROR_VALIDATE_MAXIMUM, ERROR_VALIDATE_MINIMUM} from "./types";

export function initAjv(): Ajv {

    const ajv = new Ajv({
        allErrors: true,
        $data: true,
    });

    const ajvFormats = require('ajv-formats');
    const ajvErrors = require('ajv-errors');

    ajvErrors(ajv);
    ajvFormats(ajv, {
        formats: ['date', 'time'],
        keywords: true,
        mode: 'fast',
    });

    ajv.addKeyword(validateMinimumNumber);
    ajv.addKeyword(validateMaximumNumber);

    return ajv;
}

/**
 * @function validateMinimumNumber is in theory not necessary (same as minimum)
 * This is just to showcase custom keyword implementation with custom error handling
 */
const validateMinimumNumber: KeywordDefinition = {
    keyword: 'validateMinimum',
    type: 'number',
    errors: true,
    schemaType: 'boolean',
    validate: function v(schema: any, data: any, _parentSchema?: AnySchemaObject, dataCxt?: DataValidationCxt): boolean {

        if(!schema) {
            return false;
        }

        const minLimit = 100;
        const isValid = data >= minLimit;

        if(!isValid) {
            (v as SchemaValidateFunction).errors = [{
                keyword: 'validateMinimum',
                instancePath: dataCxt?.instancePath,
                message: `${ERROR_VALIDATE_MINIMUM} Value ${data} is below ${minLimit}`,
                params: {
                    keyword: 'errorMessage',
                    min: minLimit
                },
                schemaPath: '',
            }];
        }

        return isValid;
    }
}

/**
 * @function validateMaximumNumber is in theory not necessary (same as maximum)
 * This is just to showcase custom keyword implementation with custom error handling
 */
const validateMaximumNumber: KeywordDefinition = {
    keyword: 'validateMaximum',
    type: 'number',
    errors: true,
    schemaType: 'boolean',
    validate: function v(schema: any, data: any, _parentSchema?: AnySchemaObject, dataCxt?: DataValidationCxt): boolean {

        if(!schema) {
            return false;
        }

        const maxLimit: number = 1000;
        const isValid = data <= maxLimit;

        if(!isValid) {
            (v as SchemaValidateFunction).errors = [{
                keyword: 'validateMaximum',
                instancePath: dataCxt?.instancePath,
                message: `${ERROR_VALIDATE_MAXIMUM} Value ${data} is above ${maxLimit}`,
                params: {
                    keyword: 'errorMessage',
                    max: maxLimit
                },
                schemaPath: '',
            }];
        }

        return isValid;
    }
}