import { z } from 'zod';

const foundationSizeSchema = z.object({
    length: z.number().min(1, 'Length must be a positive number'),
    width: z.number().min(1, 'Width must be a positive number'),
    height: z.number().min(1, 'Height must be a positive number')
});

export const formSchemaValidate = z.object({
    foundation: z.string().min(1, {
        message: 'Foundation is required.'
    }),
    foundationSize: foundationSizeSchema
});
