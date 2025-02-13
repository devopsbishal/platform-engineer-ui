import { PATH } from "@/constants/PATH"
import { useSearch, useNavigate } from "@tanstack/react-router"

export const useRedirectAfterLogin = () => {
    const navigate = useNavigate()
    const { redirect } = useSearch({ from: "/(auth)/sign-in" }) as { redirect?: string }

    return () => {
        navigate({ to: redirect || PATH.dashboard })
    }
}
