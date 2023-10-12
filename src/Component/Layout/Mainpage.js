import React from 'react'
import { Sidebar } from './Sidebar'
import Activepages from './Activepages'

export default function Mainpage() {
  return (
    <div>
        <div className='flex bg-[#0A1020] h-[100vh] w-[100%] py-4 px-2'>
            <Sidebar/>
            <Activepages/>
        </div>
    </div>
  )
}
