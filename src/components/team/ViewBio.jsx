import React from 'react'
import { useLocation } from 'react-router-dom'
import defaultImage from "@/images/avatar-default.png"

const ViewBio = () => {

  const location = useLocation()
  const member = location.state.member
  const memeberPic = member.picture && member.picture.url ? member.picture.url : defaultImage
  if (!member) window.location = '/team'

  return (
    <div className="md:p-24 flex flex-col justify-content-center">
      <div className='w-full md:w-1/3 mx-auto border rounded-lg p-4'>
        <img className="my-4 w-1/2 md:w-1/3 mx-auto shadow-md dark:shadow-gray-500 border rounded-lg transition-all duration-800"
          src={memeberPic} alt={member && member.name} />
        <h1 className="py-2 text-center text-xl md:text-2xl font-black text-[#0070ba]">{member && member.name}</h1>
        <h4 className="py-2 text-center font-semibold">{member && member.title}</h4>
        <h6 className="py-1 text-center font-semibold">{member && member.email}</h6>
      </div>
      <p className="py-3 px-3 my-8 text-justify text-xs md:text-xl">
        {member.bio}
      </p>
    </div>
  )
}

export default ViewBio
