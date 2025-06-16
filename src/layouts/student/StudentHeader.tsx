import React from 'react'
import { Link } from 'react-router';

// const menuArray = ["요약", "진도표", "오답 체크"] // <-- 나중에 이걸로 갈아끼워야 함
class Menu {
  endpoint: string;
  label: string;

  constructor(endpoint: string, label: string) {
    this.endpoint = endpoint
    this.label = label
  }
}

const menuArray = [
  new Menu("homework", "숙제"),
  new Menu("progress", "진도"),
  new Menu("review-check", "오답"),
]

const RoundLink = (menu: Menu) => {
  return (
    <Link key={menu.endpoint} to={`/${menu.endpoint}`} className='w-12 h-12 bg-amber-600 flex justify-center items-center rounded-full'>
      {menu.label}
    </Link>
  )
}

const StudentHeader = () => {
  return (
    <div className='h-full bg-amber-700 p-3 flex flex-col items-center gap-3 w-18'>
      {menuArray.map((menu) => RoundLink(menu))}
    </div>
  )
}

export default StudentHeader