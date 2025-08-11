import { useValidateUser } from '../_hooks/miniHooks'
import ProgressInstructorContent from '../features/progress/ProgressInstructorContent'
import ProgressStudentContent from '../features/progress/ProgressStudentContent'

const ProgressPage = () => {
  const { user } = useValidateUser()
  if (!user) { return null }

  switch (user.role) {
    case "STUDENT": return <ProgressStudentContent />
    case "INSTRUCTOR": return <ProgressInstructorContent />
    default: throw new Error("---- Un-handled role user logged in")
  }
}

export default ProgressPage