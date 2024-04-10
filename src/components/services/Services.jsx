import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody, Typography, Button, } from "@material-tailwind/react"
import { getServices } from "@/redux/slices/servicesSlice"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../utils/Loading"
import houseDefault from "@/images/house-default.jpg";

const Services = () => {

  const dispatch = useDispatch()
  const { services, isLoading } = useSelector(state => state.services)
  const [preloadedImages, setPreloadedImages] = useState({});
  useEffect(() => { dispatch(getServices()) }, [dispatch])

  useEffect(() => {
    const preloadImages = async () => {

      const imagesToPreload = services.map(service => ({
        serviceID: service._id,
        imageUrl: service.serviceImage || houseDefault,
      }));

      const preloaded = await Promise.all(imagesToPreload.map(async ({ serviceID, imageUrl }) => {
        const response = await fetch(imageUrl);

        if (response.ok) {
          const blob = await response.blob();
          return { serviceID, blob };
        }

        return { serviceID, blob: null };
      }));

      const preloadedImagesObject = {};
      preloaded.forEach(({ serviceID, blob }) => {
        preloadedImagesObject[serviceID] = blob ? URL.createObjectURL(blob) : houseDefault;
      });

      setPreloadedImages(preloadedImagesObject);
    }

    preloadImages();
  }, [services]);

  return (
    <section className="services-section py-0 py-lg-4" id="services">
      <div className="container">
        <h1 className="mt-8 mb-12  text-center font-weight-bolder text-2xl md:text-5xl">
          Our Expertise.
        </h1>

        <div className="flex flex-wrap justify-around items-center services-list pb-4">

          {isLoading && <Loading />}

          {services.map((service) => {

            let slug = service.serviceName.toLowerCase().replace(/\s/g, '-')
            const serviceImage = preloadedImages[service._id]?.src || houseDefault;

            return (
              <Card className="h-[16.5rem] w-full md:w-1/2 lg:w-1/2 md:max-w-[45%] flex-row justify-center items-center m-2 md:m-4 border" key={service._id}>
                <CardHeader shadow={false} floated={false}
                  className="h-64 w-1/2 md:w-2/5 m-0 p-2 shrink-0 rounded-r-none flex items-center justify-center">
                  <img src={serviceImage} alt="card-image" className="h-full w-full object-cover" />
                </CardHeader>

                <CardBody className="p-2 md:px-4 md:py-3 h-64 w-3/5 overflow-hidden flex flex-col justify-between">
                  <>
                    <Typography variant="h6" color="gray" className="mb-0 md:mb-2 uppercase line-clamp-1 text-xs md:text-base">
                      {service.serviceTitle}
                    </Typography>
                    <Typography variant="h5" color="blue-gray" className="mb-0 md:mb-2 line-clamp-2 text-sm md:text-base">
                      {service.serviceName}
                    </Typography>
                    <Typography color="gray" className="mb-0 md:mb-2 font-normal line-clamp-5 md:line-clamp-3 text-sm md:text-base">
                      {service.serviceDetail}
                    </Typography>
                  </>

                  <Link className="mb-0" to={`/services/${slug}`} state={{ service }}>
                    <Button variant="text"
                      className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 text-xs md:text-base text-[#F0AD4E] hover:text-blue-700">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth={2}
                        className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            )
          })}

        </div>
      </div>
    </section>
  )
}

export default Services