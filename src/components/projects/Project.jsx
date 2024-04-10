import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProjectByPath } from "@/redux/slices/projectsSlice"
import Loading from "../utils/Loading"
import houseDefault from "@/images/house-default.jpg";
import useCloudinaryImage from "../utils/useCloudinaryImage"

const Project = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const project = location && location.state ? location.state.project : useSelector(state => state.projects.project)
    const isLoading = useSelector(state => state.projects.isLoading)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")

    // if project is undefined, or null get project from redux with location.pathname
    useEffect(() => {
        if (!project) {
            let slug = location.pathname.split("/")[2]
            dispatch(getProjectByPath(slug))
        }
    }, [dispatch, project, location.pathname])

    // Project Image, if the image can not be loaded, use a default image
    const projectImage = useCloudinaryImage(project && project.pGallery.length > 0 ? project.pGallery[0].url : houseDefault, houseDefault)
    const galleryImages = project?.pGallery.map(image => ({
        ...image,
        imageUrl: useCloudinaryImage(image.url, houseDefault),
    }));

    const ImageModal = ({ isOpen, onClose, image }) => {
        return (
            isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center max-h-screen overflow-y-auto" onClick={onClose}>
                    <div className="bg-white z-50 p-3 rounded shadow-lg">
                        <img src={image} className="w-full h-3/5 object-cover" alt="project" />
                        <button className="my-2 bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded" onClick={onClose}>
                            Close
                        </button>
                    </div>
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                </div>))
    }

    return (
        <section className="projects-section py-0 py-lg-4" id="projects">

            {isLoading ? <Loading /> :

                <div className="container">

                    <figure className="relative h-96 w-full my-6">
                        <img className="h-full w-full rounded-md object-cover object-center"
                            src={projectImage}
                            alt="nature image" />

                        <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-md border border-[#F0AD4E] bg-[#F0AD4E]/75 py-2 px-2 md:py-4 md:px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm flex-col md:flex-row">
                            <div>
                                <Typography variant="h5" color="black" className="text-sm md:text-xl">
                                    {project && project.pName}
                                </Typography>

                                <Typography color="white" className="mt-2 font-normal text-xs md:text-base">
                                    Elysium Group Ltd
                                </Typography>
                            </div>
                            <Typography variant="h6" color="black" className="text-xs md:text-base">
                                {project && project.pLocation && project.pLocation.toLowerCase().split(/[–-]+/).join(", ").split(" ")
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                            </Typography>
                        </figcaption>
                    </figure>

                    <div className="p-4 mb-4 md:mt-12">
                        <Typography variant="h1" color="gray" className="mb-0 md:mb-5 uppercase text-md md:text-5xl">
                            {project && project.pName}
                        </Typography>

                        <Typography color="gray" className="mb-0 mt-3 md:mt-20 md:mb-2 font-normal text-sm md:text-xl">
                            {project && project.pDescription === "" ?
                                "This project was implemented by Elysium Group Ltd. It was a great success and we are proud to have been part of it. It was a great experience because we were able to work with a great team of professionals who were dedicated to the success of the project. In the end, the project was completed on time and within budget. We are proud of the work we did and we look forward to working on more projects in the future." :
                                project && project.pDescription}
                        </Typography>

                        <div className="flex justify-start items-center mt-4 md:mt-8">
                            <Link to="/contact" className="text-blue-700 hover:underline">
                                <button className="bg-[#F0AD4E] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base">
                                    Contact Us For More ...
                                </button>
                            </Link>
                        </div>

                        {/* Project Gallery */}
                        <h1 className="mt-8 mb-10  text-center font-weight-bolder text-2xl md:text-5xl">
                            Project Gallery.
                        </h1>
                        <div className="flex flex-wrap justify-around items-center projects-list pb-4">
                            {galleryImages.map((imageObj, index) => (
                                <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2 group">
                                    <div className="md:p-2">
                                        <div className="h-40 md:h-60 overflow-hidden group-hover:border-solid border-2 border-[#009cde] transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                                            onClick={() => {
                                                setSelectedImage(imageObj.imageUrl);
                                                setIsModalOpen(true);
                                            }}>
                                            <img src={imageObj.imageUrl} className="w-full h-full object-cover" alt="project" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }

            <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} image={selectedImage} />

        </section>
    )
}

export default Project