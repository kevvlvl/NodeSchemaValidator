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
            type: 'number',
            validateMinimum: true,
            validateMaximum: true,
            errorMessage: {
                validateMinimum: 'amount must be above or equals 100',
                validateMaximum: 'amount must be below or equals 1000',
            },
        },
    },
    required: ['amount'],
};