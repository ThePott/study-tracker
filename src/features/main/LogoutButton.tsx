import NeutralButton from '@/src/shared/components/NeutralButton'
import useBoundStore from '@/src/shared/store'

const LogoutButton = () => {
  const setUser = useBoundStore((state) => state.setUser)

  return (
    <NeutralButton onClick={() => setUser(null)} label='로그아웃' />
  )
}

export default LogoutButton