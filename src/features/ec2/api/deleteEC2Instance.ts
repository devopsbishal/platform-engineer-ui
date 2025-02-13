import axios from 'axios';
import { BASE_URL } from '@/constants/common';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { FetchErrorSchema, } from '../create-instance/types/IInstanceSchema';
import { z } from 'zod';

const FetchResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    response: z.array(z.string())
})

type GetInstanceResponse = z.infer<typeof FetchResponseSchema>


export const deleteEC2Instance = async (id: string) => {
    try {
        const { accessToken } = useAuthStore.getState();

        if (!accessToken) throw new Error("Access token is missing. Please log in again.");

        // Send request
        const response = await axios.delete<GetInstanceResponse>(
            `${BASE_URL}/api/v1/resources/aws/ec2/delete-specific-instance/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            },
        );

        const parsedResponse = FetchResponseSchema.safeParse(response.data);
        if (!parsedResponse.success) throw new Error("Invalid API response format.");

        return parsedResponse.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = FetchErrorSchema.safeParse(error.response.data)
            throw parsedError.success ? parsedError.data : new Error("Invalid error response format");
        }
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred while getting an EC2 instance.");
    }
};

