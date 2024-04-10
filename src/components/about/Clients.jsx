import React, { useState, useEffect } from 'react'
import { getClients } from '@/redux/slices/clientsSlice'
import { useSelector, useDispatch } from "react-redux"
import { Carousel, IconButton } from "@material-tailwind/react"
import Loading from '../utils/Loading'
import houseDefault from "@/images/house-default.jpg";
import useCloudinaryImage from "../utils/useCloudinaryImage"

const Clients = () => {
    const { clients, isLoading } = useSelector(state => state.clients)
    const [preloadedImages, setPreloadedImages] = useState({});
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])

    // Function to group clients into sets of three
    const groupClients = (clients) => {
        const groups = []
        for (let i = 0; i < clients.length; i += 3) {
            groups.push(clients.slice(i, i + 3))
        }
        return groups
    }

    // Group clients into sets of three
    const groupedClients = groupClients(clients)

    useEffect(() => {

        const preloadLogos = async () => {
            const images = {};
            for (const client of clients) {
                const image = new Image();
                image.src = client.clientLogo && client.clientLogo.url || houseDefault;
                images[client._id] = image;
            }
            setPreloadedImages(images);
        }

        preloadLogos();

    }, [clients]);

    return (
        <div className="py-4">

            <div className="mb-3 py-2">
                <h3 className="text-3xl font-bold text-center text-gray-800">
                    Notable Clients
                </h3>
            </div>

            <div className="flex flex-wrap justify-center w-full">
                <Carousel className="rounded-xl" navigation={() => void 0} autoplay={true}
                    loop={true} transition={{ type: "tween", duration: 0.5, timingFunction: "ease" }}

                    prevArrow={({ handlePrev }) => (
                        <IconButton variant="text" color="blue" size="lg" onClick={handlePrev}
                            className="!absolute top-2/4 left-0 -translate-y-2/4 hidden md:inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </IconButton>
                    )}

                    nextArrow={({ handleNext }) => (
                        <IconButton variant="text" color="blue" size="lg" onClick={handleNext}
                            className="!absolute top-2/4 !right-0 -translate-y-2/4 hidden md:inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </IconButton>
                    )}>

                    {isLoading && <Loading />}

                    {groupedClients && groupedClients.map((group, index) => {
                        return (
                            <div key={index} className='flex justify-center items-center w-full md:px-20 my-2 flex-col md:flex-row'>
                                {group.map((client) => {
                                    const { _id, clientName } = client
                                    const clientImage = preloadedImages[_id]?.src || houseDefault

                                    return (
                                        <div key={_id} className="flex-1 flex justify-center items-center flex-row md:flex-col m-2">
                                            <img
                                                src={clientImage}
                                                alt={clientName}
                                                className="object-cover rounded-xl h-80 border border-blue-gray-200"
                                            />
                                        </div>)
                                })}
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default Clients