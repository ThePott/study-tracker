import LoginButton from "../features/main/LoginButton"
import { styleClassName } from "../shared/constants/style"


const MainPage = () => {


  return (
    <div className={`${styleClassName.fullScreen} ${styleClassName.center}`}>
      <div className={styleClassName.groupByBorder}>
        <div className={styleClassName.groupByBorder}>I'm gonna add demo login page here</div>
        <LoginButton role="STUDENT" />
        <LoginButton role="INSTRUCTOR" />
      </div>
    </div>
  )
}

export default MainPage