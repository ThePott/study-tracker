import { common } from '@mui/material/colors';
import React from 'react'
import { Link } from 'react-router';
import { useLocation } from 'react-router'

class Menu {
  endpoint: string;
  label: string;

  constructor(endpoint: string, label: string) {
    this.endpoint = endpoint
    this.label = label
  }
}

const menuArray = [
  new Menu("summary", "요약"),
  new Menu("progress", "진도표"),
  new Menu("review-check", "오답 체크"),
]

const activeTabColor = "bg-bg0"
const inactiveTabColor = "bg-black"

const RoundLink = (menu: Menu, currentEndpoint: string) => {
  const isSelected = menu.endpoint === currentEndpoint

  // side block style
  const commonXStyle = `w-4 z-10 ${inactiveTabColor}`
  const leftStyle = `${commonXStyle} ${isSelected ? "rounded-br-[12px]" : ""}`
  const rightStyle = `${commonXStyle} ${isSelected ? "rounded-bl-[12px]" : ""}`

  // link style
  const color = isSelected ? activeTabColor : inactiveTabColor
  const linkStyle = `${color} w-[100px] p-3 flex justify-center items-center rounded-t-[12px] z-10`

  return (
    <div className='flex'>
      <div key={`${menu.endpoint}-in-left`} className={`${leftStyle}`}></div>
      <Link key={menu.endpoint} to={`/student/${menu.endpoint}`} className={linkStyle}>
        {menu.label}
      </Link>
      <div className={`${rightStyle}`}></div>
    </div>
  )
}

const StudentHeader = () => {
  const location = useLocation()
  const currentEndpoint = location.pathname.split("/").at(-1)

  return (
    <div className='w-full h-[60px] pt-3 bg-amber-700 flex items-center relative sm:rounded-t-[24px]'>
      <div className={`w-full h-1/2 absolute top-0 ${inactiveTabColor} sm:rounded-t-[24px]`}></div>
      <div className={`w-full h-1/2 absolute bottom-0 ${activeTabColor}`}></div>

      <div className={`w-[16px] h-full z-10 ${inactiveTabColor} sm:rounded-tl-[24px]`}></div>
      {menuArray.map((menu) => RoundLink(menu, currentEndpoint ?? ""))}
      <div className={`h-full z-10 grow ${inactiveTabColor} sm:rounded-tr-[24px]`}></div>
    </div>
  )
}



export default StudentHeader