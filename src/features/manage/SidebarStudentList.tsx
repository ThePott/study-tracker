import NeutralButton from "@/src/shared/components/NeutralButton";
import { scrollbarStyle, styleClassName } from "@/src/shared/constants/style";
import { Student } from "@/src/shared/interfaces";
import { useLoaderData } from "react-router";

const StudentButton = ({ student }: { student: Student }) => {
  return (
    <NeutralButton label={student.name} variant={"NEAUTRUAL"} />
  )
}

const SidebarStudentList = () => {
  const studentArray = useLoaderData<Student[]>()

  return (
    <div style={scrollbarStyle} className={`${styleClassName.flexCol} overflow-x-hidden overflow-y-scroll`}>
      {studentArray.map((student) => <StudentButton student={student} />)}
    </div>
  )
}

export default SidebarStudentList