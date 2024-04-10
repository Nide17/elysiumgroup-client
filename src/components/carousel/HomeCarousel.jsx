import React, { useEffect, useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import architecture1 from '../../images/carousel/architecture4.jpg'
import architecture_thum from '../../images/carousel/architecture_thum.jpg'
import civil_engineering from '../../images/carousel/civil_engineering.jpg'
import civil_engineering_thum from '../../images/carousel/civil_engineering_thum.jpg'
import mechanical from '../../images/carousel/mechanical.jpg'
import mechanical_thum from '../../images/carousel/mechanical_thum.jpg'
import ict_support from '../../images/carousel/ict_support.jpg'
import ict_support_thum from '../../images/carousel/ict_support_thum.jpg'
import Loading from "../utils/Loading"

const images = [
    {
        original: architecture1,
        thumbnail: architecture_thum,
        description: "Our expertise delivers exceptional building designs and supervision!",
        originalTitle: "Architecture & Design",
    },
    {
        original: civil_engineering,
        thumbnail: civil_engineering_thum,
        description: "Seeking remarkable engineering solutions? Look no further!",
        originalTitle: "Civil Engineering",
    },
    {
        original: mechanical,
        thumbnail: mechanical_thum,
        description: "Exceptional hydraulic and structural engineering design!",
        originalTitle: "Mechanical Engineering",
    },
    {
        original: ict_support,
        thumbnail: ict_support_thum,
        description: "Leverage our tech expertise to bring your business online!",
        originalTitle: "ICT Support",
    },
]

const HomeCarousel = () => {
    const [loading, setLoading] = useState(true)
    const [preloadImages, setPreloadImages] = useState([])
    useEffect(() => {
        const preloaded = images.map((image) => {
            const img = new Image()
            img.src = image.original
 
            // set false on last image load
            img.onload = () => {
                if (preloaded.length === images.length) {
                    setLoading(false)
                }
            }
        })

        setPreloadImages(images)
    }, [])

    if (loading) return <Loading />
    
    return (
        <div className='my-auto px-2 py-2 md:py-10'>
            <ImageGallery
                items={preloadImages}
                lazyLoad={true}
                showPlayButton={false}
                showBullets={true}
                autoPlay={false}
                slideInterval={6000}
                showNav={true}
                thumbnailPosition="left"
                showFullscreenButton={false}
            />
        </div>
    )
}

export default HomeCarousel
