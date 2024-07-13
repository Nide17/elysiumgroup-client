import React from 'react';
import { SocialIcon } from 'react-social-icons'

const Social = ({ icon }) => {
    return (
        <li>
            <SocialIcon url={icon.link} network={icon.name} style={{ height: 40, width: 40 }} />
        </li>
    )

}
export default Social;
