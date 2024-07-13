import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import Loading from '../utils/Loading'
import { getUsers } from '@/redux/slices/usersSlice'
import defaultImage from "@/images/avatar-default.png"

const Team = () => {

    const { users, isLoading } = useSelector(state => state.users)
    const [preloadedImages, setPreloadedImages] = useState({});
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getUsers()) }, [dispatch])

    useEffect(() => {
        const preloadImages = async () => {
            const images = {};
            for (const user of users) {
                const image = new Image();
                image.src = user.picture && user.picture.url || defaultImage;
                images[user._id] = image;
            }
            setPreloadedImages(images);
        }
        preloadImages();
    }
        , [users]);

    return (
        <section className="team-section py-0 py-lg-4">

            <div className="container">
                <h1 className="mt-8 mb-12  text-center font-weight-bolder text-2xl md:text-5xl">
                    Team.
                </h1>
                <div className="flex flex-col md:flex-row justify-content-around align-items-center">

                    {isLoading && <Loading />}

                    {users && users.map(member => {

                        if (!member.title || member.title == 'Unassigned') return null
                        let slug = member.name.toLowerCase().replace(/\s/g, '-')

                        return (
                            <Link to={`/view-bio/${slug}`} state={{ member }}
                                className="w-100 md:w-1/4 mx-4 my-4 p-4 shadow-md dark:shadow-slate-2000 border rounded-lg border-gray-700 hover:scale-105"
                                key={member._id}>
                                <div className="mr-4 flex justify-content-center">
                                    <img className="h-24 w-24 md:h-32 md:w-32 object-cover
                                    shadow-md dark:shadow-gray-2000 transition-all duration-300 
                                    rounded-full cursor-pointer filter grayscale hover:grayscale-0"
                                        src={preloadedImages[member._id]?.src || defaultImage} alt="team-member" />
                                </div>

                                <div className="text-center mt-4">
                                    <h5 className="md:text-xl font-black text-[#0070ba] line-clamp-1">
                                        {member.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                    </h5>
                                    <p className="text-xs md:text-xl font-black text-[#000000]">
                                        {member.title}
                                    </p>
                                </div>
                            </Link>)
                    })
                    }
                </div>

            </div>
        </section>
    )
}

export default Team