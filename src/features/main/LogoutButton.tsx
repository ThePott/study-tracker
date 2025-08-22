import NeutralButton from "@/src/shared/components/NeutralButton"
import useBoundStore from "@/src/shared/store"

const LogoutButton = () => {
    const setUser = useBoundStore((state) => state.setUser)

  return (
    <NeutralButton onClick={() => setUser(null)} variant={'NEUTRAL'}>로그아웃</NeutralButton>
  )
}

export default LogoutButton
