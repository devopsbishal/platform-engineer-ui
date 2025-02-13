import axios from 'axios';
import { BASE_URL } from '@/constants/common';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { FetchErrorSchema, } from '../create-instance/types/IInstanceSchema';
import { FetchResponseSchema } from '../types/IInstancesSchema';
import { z } from 'zod';

type GetInstanceResponse = z.infer<typeof FetchResponseSchema>


export const getEC2Instance = async (
    page = 1,
    limit = 10
) => {
    try {
        // Extract auth details
        const { accessToken } = useAuthStore.getState();

        if (!accessToken) throw new Error("Access token is missing. Please log in again.");

        // Send request
        const response = await axios.get<GetInstanceResponse>(
            `${BASE_URL}/api/v1/resources/aws/ec2/list-user-instances`,
            {
                params: { page, limit },
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            },
        );
        console.log(response.data)

        // Validate response data
        const parsedResponse = FetchResponseSchema.safeParse(response.data);
        if (!parsedResponse.success) throw new Error("Invalid API response format.");

        return parsedResponse.data.instances;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = FetchErrorSchema.safeParse(error.response.data)
            throw parsedError.success ? parsedError.data : new Error("Invalid error response format");
        }
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred while getting an EC2 instance.");
    }
};

