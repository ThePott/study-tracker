import { useValidateUser } from "../_hooks/miniHooks"
import ReviewCheckInstructorContent from "../features/reviewCheck/ReviewCheckInstructorContent"
import ReviewCheckStudentContent from "../features/reviewCheck/ReviewCheckStudentContent"

const ReviewCheckPage = () => {
    const { user } = useValidateUser()
    if (!user) {
        return null
    }

    switch (user.role) {
        case "STUDENT":
            return <ReviewCheckStudentContent />
        case "INSTRUCTOR":
            return <ReviewCheckInstructorContent />
        default:
            throw new Error("---- Un-handled role user logged in")
    }
}

export default ReviewCheckPage
