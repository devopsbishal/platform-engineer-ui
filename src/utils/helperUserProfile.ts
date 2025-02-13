import { BASE_URL } from "@/constants/common";
import { useAuthStore } from "@/features/auth/stores/authStore";
import axios from "axios";

interface ProfileResponse {
    success: boolean;
    profile: {
        _id: string;
        role: {
            _id: string;
            label: 'user' | 'admin';
            scopes: [];
        };
        email: string;
    };
}

export const fetchUserProfile = async (accessToken: string) => {
    const { setUser } = useAuthStore.getState()


    const { data } = await axios.get<ProfileResponse>(
        `${BASE_URL}/api/v1/user/profile`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
        }
    );

    if (!data.success) {
        throw new Error('Profile fetching was not successful');
    }

    if (data.success) {
        setUser({
            id: data.profile._id,
            email: data.profile.email,
            name: data.profile.role.label
        });
    }

    return data.profile;
};