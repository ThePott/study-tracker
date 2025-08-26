import { useNavigate } from "react-router"
import useBoundStore from "../shared/store"
import { useEffect } from "react"

const ManagePage = () => {
    const navigate = useNavigate()
    const user = useBoundStore((state) => state.user)
    useEffect(() => {
        if (user && user.role === "INSTRUCTOR") {
            return
        }
        navigate("/")
    }, [user])

    if (!user) {
        return null
    }
    return <div>ManagePage</div>
}

export default ManagePage
