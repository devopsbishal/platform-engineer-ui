import { z } from "zod";

export const loginResponseSchema = z.object({
    message: z.string(),
    success: z.boolean(),
    accessToken: z.string(),
});

export const loginErrorSchema = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    stack: z.object({})
});