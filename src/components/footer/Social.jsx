import React from 'react';
import { SocialIcon } from 'react-social-icons'

const Social = ({ icon }) => {
    return (
        <li>
            <SocialIcon
                url={icon.link}
                network={icon.name}
                bgColor="#F0AD4E"
                fgColor="#009cde"
                style={{ height: 32, width: 32 }}
                className='border-2 border-white rounded-full p-1 hover:*:hover:bg-[#009cde] hover:text-white' 
                />
        </li>
    )

}
export default Social;
