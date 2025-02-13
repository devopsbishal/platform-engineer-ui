import axios from "axios"
import { FetchErrorSchema, AMIListResponseSchema, InstanceTypeResponseSchema } from "../types/IInstanceSchema"
import { z } from "zod"
import { BASE_URL } from "@/constants/common"
import { useAuthStore } from "@/features/auth/stores/authStore"

type GetAMIListResponse = z.infer<typeof AMIListResponseSchema>
type GetInstanceTypeResponse = z.infer<typeof InstanceTypeResponseSchema>


export const getAMIList = async () => {
    try {
        const { accessToken } = useAuthStore.getState();

        if (!accessToken) throw new Error("Access token is missing. Please log in again.");

        const response = await axios.get<GetAMIListResponse>(
            `${BASE_URL}/api/v1/resources/aws/resource/list-ami`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                withCredentials: true
            }
        )

        const parsedResponse = AMIListResponseSchema.safeParse(response.data);
        if (!parsedResponse.success) throw new Error("Invalid API response format.");

        return parsedResponse.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = FetchErrorSchema.safeParse(error.response.data)
            throw parsedError.success ? parsedError.data : new Error("Invalid error response format");
        }
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred while retrieving the AMI list.");
    }
}

export const getInstancetype = async () => {
    try {
        const { accessToken } = useAuthStore.getState();

        if (!accessToken) throw new Error("Access token is missing. Please log in again.");

        const response = await axios.get<GetInstanceTypeResponse>(
            `${BASE_URL}/api/v1/resources/aws/resource/list-instance-type`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                withCredentials: true
            }
        )

        const parsedResponse = InstanceTypeResponseSchema.safeParse(response.data);
        if (!parsedResponse.success) throw new Error("Invalid API response format.");

        return parsedResponse.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = FetchErrorSchema.safeParse(error.response.data)
            throw parsedError.success ? parsedError.data : new Error("Invalid error response format");
        }
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred while retrieving the Instance Type.");
    }
}