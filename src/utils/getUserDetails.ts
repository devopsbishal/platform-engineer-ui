import { useAuthStore } from "@/features/auth/stores/authStore"

const getUserDetails = () => {
    const { user } = useAuthStore.getState()
    return (
        user?.name
    )
}

export default getUserDetails