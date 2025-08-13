import { styleClassName } from '@/src/shared/constants/style'
import { User } from '@/src/shared/interfaces/_loginInterfaces'
import useBoundStore from '@/src/shared/store'
import { useNavigate } from 'react-router'


type Role = "STUDENT" | "INSTRUCTOR"


const makeLabel = (role: Role) => {
  switch (role) {
    case "INSTRUCTOR": return "강사로 로그인"
    case "STUDENT": return "학생으로 로그인"
  }
}


const demoInstructor: User = { id: 1, name: "박강사", role: "INSTRUCTOR" }
const demoStudent: User = { id: 2, name: "김학생", role: "STUDENT" }


const LoginButton = ({ role }: { role: Role }) => {
  const navigate = useNavigate()
  const setUser = useBoundStore((state) => state.setUser)
  
  const label = makeLabel(role)

  const handleClick = () => {
    switch (role) {
      case "INSTRUCTOR":
        setUser(demoInstructor)
        break
      case "STUDENT":
        setUser(demoStudent)
        break
    }

    navigate("/summary")
  }

  const className = `${styleClassName.button} ${styleClassName.buttonNeutral} ${styleClassName.buttonNeutralOff}`
  return (
    <button onClick={handleClick} className={className}>{label}</button>
  )
}


export default LoginButton