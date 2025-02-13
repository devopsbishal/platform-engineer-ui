import axios from 'axios';
import { BASE_URL } from '@/constants/common';
import { z } from 'zod';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { FetchErrorSchema, FetchResponseSchema } from '../types/IInstanceSchema';
import { InstanceType } from '../types/IInstanceEnum';

interface InstanceData {
    instanceName: string;
    instanceType: InstanceType;
    amiId: string;
    tags?: (Record<string, string> | undefined)[];
    numberOfInstance: number;
}

type CreateInstanceResponse = z.infer<typeof FetchResponseSchema>

export const createInstance = async (data: InstanceData) => {
    try {
        // Extract auth details
        const { accessToken, user } = useAuthStore.getState();

        if (!accessToken) throw new Error("Access token is missing. Please log in again.");

        console.debug("Creating EC2 Instance for:", user);
        console.debug(data)

        // Send request
        const response = await axios.post<CreateInstanceResponse>(
            `${BASE_URL}/api/v1/resources/aws/ec2/create-instance`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Set per request instead of globally
            },
        );

        // Validate response data
        const parsedResponse = FetchResponseSchema.safeParse(response.data);
        if (!parsedResponse.success) throw new Error("Invalid API response format.");

        return parsedResponse.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = FetchErrorSchema.safeParse(error.response.data)
            throw parsedError.success ? parsedError.data : new Error("Invalid error response format");
        }
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred while creating an EC2 instance.");
    }
};

