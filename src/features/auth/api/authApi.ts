import { BASE_URL } from '@/constants/common';
import axios from 'axios';
import { z } from 'zod';
import { loginErrorSchema, loginResponseSchema } from '../schema/authSchema';

type LoginResponse = z.infer<typeof loginResponseSchema>;
type LoginError = z.infer<typeof loginErrorSchema>;

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const response = await axios.post<LoginResponse>(
            `${BASE_URL}/api/v1/user/login`,
            data
        );

        console.debug("Try")
        return loginResponseSchema.parse(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.debug("Catch if")
            throw loginErrorSchema.parse(error.response.data) as LoginError;
        } else {
            console.debug("Catch else")
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