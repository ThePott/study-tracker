import { useNavigate } from "react-router"
import useBoundStore from "../shared/store"
import { useEffect } from "react"

/** MUST CALL ONCE per branch
 *
 * `너 여기 들어와도 돼?` 하는 걸 확인
 */
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
