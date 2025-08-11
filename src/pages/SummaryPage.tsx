import { useValidateUser } from "../_hooks/miniHooks"
import SummaryInstructorContent from "../features/summary/SummaryInstructorContent"
import SummaryStudentContent from "../features/summary/SummaryStudentContent"

const SummaryPage = () => {
  const { user } = useValidateUser()
  if (!user) { return null }
  
  switch (user.role) {
    case "STUDENT": return <SummaryStudentContent />
    case "INSTRUCTOR": return <SummaryInstructorContent />
    default: throw new Error("---- Un-handled role user logged in")
  }
}

export default SummaryPage