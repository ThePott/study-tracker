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

const RoundLink = (menu: Menu, currentEndpoint: string) => {
  const isSelected = menu.endpoint === currentEndpoint

  const commonXStyle = "w-4 bg-black"
  const leftStyle = `${commonXStyle} ${isSelected ? "rounded-br-[12px]" : ""}`
  const rightStyle = `${commonXStyle} ${isSelected ? "rounded-bl-[12px]" : ""}`

  const color = isSelected ? "bg-white" : "bg-amber-600"
  const linkStyle = `py-3 flex justify-center items-center ${color} rounded-t-[12px]`

  return (
    <div className='flex'>
      <div key={`${menu.endpoint}-out-left`} className='bg-white'>
        <div key={`${menu.endpoint}-in-left`} className={`${leftStyle}`}></div>
      </div>
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
    <div className='w-full bg-amber-700 px-3 pt-3 flex items-center'>
      {menuArray.map((menu) => RoundLink(menu, currentEndpoint ?? ""))}
    </div>
  )
}



export default StudentHeader