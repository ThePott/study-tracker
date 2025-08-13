import { useNavigate } from "react-router"
import useBoundStore from "../shared/store"

export const useValidateUser = () => {
    const navigate = useNavigate()
    const user = useBoundStore((state) => state.user)
    if (!user) {
        navigate("/")
    }
    return { user }
}