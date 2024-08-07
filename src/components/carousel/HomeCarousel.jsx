import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Loading from "../utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getValidHomeSlides } from "@/redux/slices/homeSlidesSlice";

const HomeCarousel = () => {
    const [loading, setLoading] = useState(true);
    const [preloadImages, setPreloadImages] = useState([]);
    const validHomeSlides = useSelector(state => state.homeSlides.homeSlides);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch slides on component mount
        dispatch(getValidHomeSlides());
    }, [dispatch]);

    useEffect(() => {
        const preloadImages = async () => {
            try {
                const preloadedImagesArray = await Promise.all(validHomeSlides.map(async ({ img, description, categoryTitle }) => {
                    const imageUrl = img?.url;
                    if (!imageUrl) return {};

                    const response = await fetch(imageUrl);
                    if (response.ok) {
                        const blob = await response.blob();
                        const objectUrl = URL.createObjectURL(blob);

                        return {
                            original: objectUrl,
                            thumbnail: objectUrl,
                            description,
                            originalTitle: categoryTitle,
                        };
                    }
                    return {};
                }));

                setPreloadImages(preloadedImagesArray);
            } catch (error) {
                console.error("Error preloading images:", error);
            } finally {
                setLoading(false);
            }
        };

        if (validHomeSlides.length) {
            preloadImages();
        }
    }, [validHomeSlides]);

    if (loading) return <Loading />;

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
    );
};

export default HomeCarousel;
