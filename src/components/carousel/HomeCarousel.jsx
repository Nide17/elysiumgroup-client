import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import architecture1 from '../../images/carousel/architecture4.jpg'
import architecture_thum from '../../images/carousel/architecture_thum.jpg'
import civil_engineering from '../../images/carousel/civil_engineering.jpg'
import civil_engineering_thum from '../../images/carousel/civil_engineering_thum.jpg'
import mechanical from '../../images/carousel/mechanical.jpg'
import mechanical_thum from '../../images/carousel/mechanical_thum.jpg'
import ict_support from '../../images/carousel/ict_support.jpg'
import ict_support_thum from '../../images/carousel/ict_support_thum.jpg'

const images = [
    {
        original: architecture1,
        thumbnail: architecture_thum,
        description: "Experience top-notch building designs and supervision with our expertise!",
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
        description: "Explore hydraulic and structural engineering design services at their finest!",
        originalTitle: "Mechanical Engineering",
    },
    {
        original: ict_support,
        thumbnail: ict_support_thum,
        description: "Ready to bring your business online? Utilize our tech-driven expertise!",
        originalTitle: "ICT Support",
    },
];

const HomeCarousel = () => {
    return (
        <div className='my-auto px-2 py-2 md:py-10'>
            <ImageGallery items={images} lazyLoad={true} showPlayButton={false} showBullets={true} autoPlay={false} slideInterval={6000} showNav={true} thumbnailPosition="left" showFullscreenButton={false} />
        </div>
    )
}

export default HomeCarousel
