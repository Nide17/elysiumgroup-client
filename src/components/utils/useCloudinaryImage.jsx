import React, { useEffect, useState } from 'react';

function useCloudinaryImage(cloudinaryLink, defaultImage) {
    
    const [imgSrc, setImgSrc] = useState(defaultImage);

    // FETCH IMAGE FROM CLOUDINARY
    useEffect(() => {
        
        const fetchImage = async () => {
            try {
                const response = await fetch(cloudinaryLink);
                if (response.ok) {
                    setImgSrc(cloudinaryLink);
                }
            } catch (error) {
                console.error('Error fetching image from cloudinary', error);
            }
        }

        fetchImage();

    }, [cloudinaryLink]);

    return imgSrc;
}

export default useCloudinaryImage;
