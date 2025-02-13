import { z } from "zod";
import { InstanceType } from "../types/IInstanceEnum";

// Advanced tag schema with pattern validation and transformation (optional)
const tagSchema = z.record(z.string())
    // .refine(
    //     (tag) => Object.keys(tag).length === 1,
    //     { message: "Each tag must have exactly one key-value pair." }
    // )
    // .refine((tag) => {
    //     const key = Object.keys(tag)[0];
    //     // Ensure key starts with an uppercase letter
    //     return /^[A-Z]/.test(key);
    // }, { message: "Tag keys must start with an uppercase letter." })
    .optional()

// Comprehensive form schema with enhanced validation
export const FormSchema = z.object({
    instanceName: z
        .string()
        .trim()
        .min(3, 'Instance name must be at least 3 characters')
        .max(50, 'Instance name must not exceed 50 characters')
        .regex(
            /^[a-zA-Z0-9-]+$/,
            'Instance name can only contain letters, numbers, and hyphens'
        ),

    instanceType: z.nativeEnum(InstanceType, {
        errorMap: () => ({ message: 'Please select a valid instance type' }),
    }),

    amiId: z
        .string()
        .trim()
        .regex(/^ami-[a-fA-F0-9]{17}$/, 'Invalid AMI ID format'),

    tags: z.array(tagSchema).max(5, 'Maximum 5 tags allowed'),

    numberOfInstance: z
        .union([z.string(), z.number()])
        .refine(val => Number(val) >= 1 && Number(val) <= 3, {
            message: 'Number of instances must be between 1 and 3'
        })
        .transform(val => (isNaN(Number(val)) ? 1 : parseInt(String(val), 10)))
});