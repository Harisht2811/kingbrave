import React from 'react'

import { Sidebardata } from '../../Utils/Sidebardata'
import Logo from '../../Images/Logo/crown.png'
import { useNavigate, useParams } from 'react-router-dom'

export const Sidebar = () => {

  const navigate = useNavigate();
  const params = useParams();
  const { screens } = params
  const selectedPage = (route) => {
    navigate(route.routeName)
  }
  return (
    <div>
      <div className='bg-[#0e152b] w-[300px] h-full shadow-lg rounded-md py-2 px-4'>
        <div className='text-center ml-4'>
          <p className='flex text-white text-[24px] font-Poppins font-[900]'>The &nbsp;<span><img className='w-[25px] h-[30px] ' src={Logo}></img></span> &nbsp;Brave Boyz</p>
        </div>
        <div>
          {
            Sidebardata.map((items, index) => {
              return (
                <div className=

                  {`${items.routeName.includes(screens) ||
                      (!screens && items["routeName"] === "home")
                      ? "flex mt-[2%] py-2 px-2 bg-gray-500 w-[250px] rounded-md opacity-[1px] cursor-pointer"
                      : "flex mt-[2%] py-2 px-2 hover:bg-gray-500 rounded-md w-[250px] cursor-pointer"
                    } `}
                  key={index}
                  onClick={() => { selectedPage(items) }}
                >
                  <img className='h-[30px] w-[20px]' src={items.icon} ></img>
                  <p className='text-white text-[18px] font-Poppins font-[500] ml-[10%]' >{items.name}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
