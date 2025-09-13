export const ERROR_VALIDATE_MINIMUM: string = 'ERROR VALIDATE_MINIMUM';
export const ERROR_VALIDATE_MAXIMUM: string = 'ERROR VALIDATE_MAXIMUM';

export const schema = {
    type: 'object',
    properties: {
        amount: {
            type: 'number',
            validateMinimum: true,
            validateMaximum: true,
            errorMessage: {},
        },
    },
    required: ['amount'],
};

export const schemaWithErrors = {
    type: 'object',
    properties: {
        amount: {
            type: 'integer',
            validateMinimum: true,
            validateMaximum: true,
            errorMessage: {
                validateMinimum: 'amount must be above or equals 100',
                validateMaximum: 'amount must be below or equals 1000',
            },
        },
        actionedOn: {
            type: 'string',
            format: 'date',
            formatMinimum: '2025-05-01',
            formatMaximum: '2025-09-01',
            errorMessage: {
                formatMinimum: 'date must be at least from May 1, 2025',
                formatMaximum: 'date must be up to September 1, 2025',
            }
        },
    },
    required: ['amount', 'actionedOn'],
};

export const schemaWithConditions = {
    type: 'object',
    properties: {
        mode: {
            type: 'string',
        },
        amount: {
            type: 'integer',
        }
    },
    required: ['mode', 'amount'],
    if: {
        properties: {
            mode: {
                const: 'small',
            }
        }
    },
    then: {
        properties: {
            amount: {
                type: 'integer',
                minimum: 0,
                maximum: 25,
                errorMessage: 'The integer value must be between 0 and 25',
            }
        }
    },
    else: {
        properties: {
            amount: {
                type: 'integer',
                minimum: 1000,
                maximum: 2500,
                errorMessage: 'The integer value must be between 1000 and 2500',
            }
        }
    }
}