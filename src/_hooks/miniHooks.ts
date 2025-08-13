import { useNavigate } from "react-router"
import useBoundStore from "../shared/store"
import { useEffect } from "react"

/** MUST CALL ONCE per branch */
export const useValidateUser = () => {
    const navigate = useNavigate()
    const user = useBoundStore((state) => state.user)
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])
    return { user }
}