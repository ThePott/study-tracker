import useBoundStore from "@/src/shared/store"
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"

const LogInOutContent = () => {
    const user = useBoundStore((state) => state.user)

    if (user) return <LogoutButton />

    return (
        <>
            <LoginButton role="STUDENT" />
            <LoginButton role="INSTRUCTOR" />
        </>
    )
}

export default LogInOutContent