import NeutralButton from "@/src/shared/components/NeutralButton";
import { scrollbarStyle, styleClassName } from "@/src/shared/constants/style";
import { User } from "@/src/shared/interfaces";
import useBoundStore from "@/src/shared/store";
import { memo } from "react";
import { useLoaderData } from "react-router";

const UserButton = memo(({ user, isOn }: { user: User, isOn: boolean }) => {
  const setSelectedUser = useBoundStore((state) => state.setSelectedUser)

  const handleClick = () => {
    setSelectedUser(user)
  }
  return (
    <NeutralButton isOn={isOn} onClick={handleClick} label={user.name} variant={"NEUTRAL"} />
  )
})

const SidebarStudentList = () => {
  const userArray = useLoaderData<User[]>()
  const selectedUser = useBoundStore((state) => state.selectedUser)
  const isOnArray = userArray.map((user) => user.id === selectedUser?.id)

  return (
    // <div style={scrollbarStyle} className={`${styleClassName.flexCol} overflow-x-hidden overflow-y-scroll`}>
    <>
      {userArray.map((user, index) => <UserButton key={user.id} user={user} isOn={isOnArray[index]} />)}
    </>
    // </div>
  )
}

export default SidebarStudentList