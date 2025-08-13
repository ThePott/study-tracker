import { useNavigate } from "react-router"
import useBoundStore from "../shared/store"

const ManagePage = () => {
  const navigate = useNavigate()
  const user = useBoundStore((state) => state.user)
  if (!user || user.role !== "INSTRUCTOR") {
    navigate("/")
    return null
  }

  return (
    <div>ManagePage</div>
  )
}

export default ManagePage