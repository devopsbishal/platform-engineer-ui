import { BASE_URL } from '@/constants/common';
import axios from 'axios';
import { z } from 'zod';

const loginResponseSchema = z.object({
    message: z.string(),
    success: z.boolean(),
    accessToken: z.string(),
});

const loginErrorSchema = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    stack: z.object({})
});

type LoginResponse = z.infer<typeof loginResponseSchema>;
type LoginError = z.infer<typeof loginErrorSchema>;

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const response = await axios.post<LoginResponse>(
            `${BASE_URL}/api/v1/user/login`,
            data
        );

        return loginResponseSchema.parse(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw loginErrorSchema.parse(error.response.data) as LoginError;
        } else {
            // Handle other unexpected errors
            throw new Error('An unexpected error occurred during login.');
        }
    }
};

export const createUser = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/user/register`,
            data
        );

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            // Handle other unexpected errors
            throw new Error('An unexpected error occurred during login.');
        }
    }
}

// TODO: return type
export const verifyAccount = async (data: { email: string; otp: number }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/user/verify`,
            data
        );

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            // Handle other unexpected errors
            throw new Error('An unexpected error occurred during login.');
        }
    }
}