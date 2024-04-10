import React from "react"
import { useLocation } from "react-router-dom"
import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import houseDefault from "@/images/house-default.jpg";
import useCloudinaryImage from "../utils/useCloudinaryImage"

const Service = () => {

  const location = useLocation()
  const service = location.state.service
  const serviceImg = useCloudinaryImage(service && service.serviceImage && service.serviceImage.url ? service.serviceImage.url : houseDefault, houseDefault)

  return (
    <section className="services-section py-0 py-lg-4" id="services">
      <div className="container">

        <figure className="relative h-96 w-full my-6">
          <img className="h-full w-full rounded-md object-cover object-center"
            src={serviceImg} alt="nature image" />

          <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-md border border-[#F0AD4E] bg-[#F0AD4E]/75 py-2 px-2 md:py-4 md:px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm flex-col md:flex-row">
            <div>
              <Typography variant="h5" color="black" className="text-sm md:text-base line-clamp-2 md:line-clamp-3">
                {service && service.serviceName}
              </Typography>
              <Typography color="white" className="mt-2 font-normal text-xs md:text-base">
                Elysium Group Ltd
              </Typography>
            </div>
            <Typography variant="h6" color="black" className="text-xs md:text-base">
              {service && service.serviceTitle && service.serviceTitle.charAt(0).toUpperCase() + service.serviceTitle.slice(1)}
            </Typography>
          </figcaption>
        </figure>

        <div className="p-4 mb-4 md:mt-12">
          <Typography variant="h1" color="gray" className="mb-0 md:mb-5 uppercase text-md md:text-5xl">
            {service && service.serviceTitle}
          </Typography>
          <Typography variant="h2" color="blue-gray" className="mt-0 md:mt-10 text-xs md:text-3xl">
            {service && service.serviceName}
          </Typography>
          <Typography color="gray" className="mb-0 mt-3 md:mt-20 md:mb-2 font-normal text-sm md:text-xl">
            {service && service.serviceDetail}
          </Typography>

          <div className="flex justify-start items-center mt-4 md:mt-10">
            <Link to="/contact" className="text-blue-700 hover:underline">
              <button className="bg-[#F0AD4E] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base">
                Contact Us For More ...
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Service