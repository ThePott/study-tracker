import LogInOutContent from "../features/main/LogInOutBox"
import { styleClassName } from "../shared/constants/style"

const MainPage = () => {
    return (
        <div
            className={`${styleClassName.fullScreen} ${styleClassName.center}`}
        >
            <div className={styleClassName.groupByBorder}>
                <div className={styleClassName.groupByBorder}>
                    I'm gonna add demo login page here
                </div>
                <LogInOutContent />
            </div>
        </div>
    )
}

export default MainPage
