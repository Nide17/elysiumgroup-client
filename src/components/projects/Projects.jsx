import React, { useState, useEffect } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Select, Option } from "@material-tailwind/react";
import { getProjects, getProjectsLocations } from "@/redux/slices/projectsSlice";
import { getPTypes } from "@/redux/slices/projectTypesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../utils/Loading";
import houseDefault from "@/images/house-default.jpg";

const Projects = () => {
    const dispatch = useDispatch();
    const { projects, isLoading, projectsLocations } = useSelector(state => state.projects);
    const { pTypes } = useSelector(state => state.pTypes);
    const pTypesLoading = useSelector(state => state.pTypes.isLoading);

    useEffect(() => { dispatch(getProjects()); }, [dispatch]);
    useEffect(() => { dispatch(getPTypes()); }, [dispatch]);
    useEffect(() => { dispatch(getProjectsLocations()); }, [dispatch]);

    const statuses = ["All", ...new Set(projects.map((project) => project.status))];
    const pTypesWithAll = ["All", ...pTypes.map((type) => type.typeName)];
    const locationsWithAll = ["All", ...[new Set(projects.map((project) => project.pLocation))].map((location) => Array.from(location)).flat()];

    const [category, setCategory] = useState('All');
    const [location, setLocation] = useState('All');
    const [status, setStatus] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [preloadedImages, setPreloadedImages] = useState({});

    useEffect(() => {
        let filtered;

        // Depending on the category, location and status that is selected, filter the projects
        if (category === 'All' && location === 'All' && status === 'All') {
            filtered = projects;
        } else if (category === 'All' && location === 'All' && status !== 'All') {
            filtered = projects.filter((project) => project.status === status);
        } else if (category === 'All' && location !== 'All' && status === 'All') {
            filtered = projects.filter((project) => project.pLocation === location);
        } else if (category === 'All' && location !== 'All' && status !== 'All') {
            filtered = projects.filter((project) => project.pLocation === location && project.status === status);
        } else if (category !== 'All' && location === 'All' && status === 'All') {
            filtered = projects.filter((project) => project.pType && project.pType.typeName === category);
        } else if (category !== 'All' && location === 'All' && status !== 'All') {
            filtered = projects.filter((project) => project.pType && project.pType.typeName === category && project.status === status);
        } else if (category !== 'All' && location !== 'All' && status === 'All') {
            filtered = projects.filter((project) => project.pType && project.pType.typeName === category && project.pLocation === location);
        } else {
            filtered = projects.filter((project) => project.pType && project.pType.typeName === category && project.pLocation === location && project.status === status);
        }
        setFilteredProjects(filtered);
    }, [category, location, status, projects]);

    const handleStatusChange = (value) => { setStatus(value); };

    useEffect(() => {

        const preloadImages = async () => {

            const imagesToPreload = projects.map(project => ({
                slug: project.pName.toLowerCase().replace(/\s/g, '-'),
                imageUrl: project.pGallery.length > 0 ? project.pGallery[0].url : houseDefault,
            }));

            const preloaded = await Promise.all(imagesToPreload.map(async ({ slug, imageUrl }) => {
                const response = await fetch(imageUrl);

                if (response.ok) {
                    const blob = await response.blob();
                    return { slug, blob };
                }

                return { slug, blob: null };
            }));

            const preloadedImagesObject = {};
            preloaded.forEach(({ slug, blob }) => {
                preloadedImagesObject[slug] = blob ? URL.createObjectURL(blob) : houseDefault;
            });

            setPreloadedImages(preloadedImagesObject);
        };

        preloadImages();
    }, [projects]);


    return (
        <section className="projects-section py-0 py-lg-4" id="projects">
            <div className="container">
                <h1 className="mt-8 mb-12 text-center font-weight-bolder text-2xl md:text-5xl">
                    Projects.
                </h1>

                {isLoading ? <Loading /> :
                    <>
                        <div className="flex justify-center items-center my-3 flex-col md:flex-row">
                            {!pTypesLoading && pTypes && pTypes.length > 0 &&
                                <div className="w-2/3 md:w-1/3 lg:w-1/5 my-2 md:m-0 md:mr-3">
                                    <Select label="Categories" color="blue" value={category}
                                        onChange={(value) => setCategory(value)}>
                                        {pTypesWithAll.map((category) => (
                                            <Option key={category} value={category}>
                                                {category}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>}

                            {projectsLocations && projectsLocations.length > 0 &&
                                <div className="w-2/3 md:w-1/3 lg:w-1/5 my-2 md:m-0 md:mr-3">
                                    <Select label="Locations" color="blue" value={location}
                                        onChange={(value) => setLocation(value)}>
                                        {locationsWithAll.map((location) => (
                                            <Option key={location} value={location}>{location}</Option>
                                        ))}
                                    </Select>
                                </div>}
                        </div>

                        <Tabs value={status} orientation="vertical"
                            className="overflow-hidden flex flex-col md:flex-row justify-center items-center md:items-start">

                            <TabsHeader className="p-2 md:p-3 md:mt-3 border rounded-none bg-[#009cde] projects-categories w-72 md:w-48">
                                {statuses.map((status) => (
                                    <Tab key={status} value={status} className="md:p-2" onClick={() => handleStatusChange(status)}>
                                        {status}
                                    </Tab>
                                ))}
                            </TabsHeader>

                            <TabsBody className="pb-3">
                                {statuses.map((status) => (
                                    <TabPanel key={status} value={status} className="p-2 md:p-4 flex projects-list">
                                        <div className="w-full">
                                            <div className="flex flex-wrap">
                                                {filteredProjects.map((project) => {
                                                    let projectSlug = project.pName.toLowerCase().replace(/\s/g, '-');
                                                    const preloadedImageUrl = preloadedImages[projectSlug] || houseDefault;

                                                    return (
                                                        <Link key={project._id} className="w-full md:w-1/2 lg:w-1/3 p-2 group"
                                                            to={`/projects/${projectSlug}`} state={{ project }}>
                                                            <div className="md:p-2">
                                                                <div className="h-40 overflow-hidden group-hover:border-solid border-2 border-[#009cde]">
                                                                    <img src={preloadedImageUrl}
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                        alt="project" />
                                                                </div>
                                                                <h4 className="font-bold text-black text-sm leading-4 mt-3 mb-1">
                                                                    <span className="group-hover:text-[#009cde]">
                                                                        {project.pName.toLowerCase().split(/[\s–-]+/).map((word) => {
                                                                            if (word === 'and' || word === 'the' || word === 'of') return word;
                                                                            return word.charAt(0).toUpperCase() + word.slice(1);
                                                                        }).join(" ")}
                                                                    </span>
                                                                </h4>
                                                                <p className="text-gray-600 text-sm group-hover:text-[#009cde]">
                                                                    {project.pLocation.toLowerCase().split(/[–-]+/).join(", ").split(" ")
                                                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                                                                </p>
                                                            </div>
                                                        </Link>)
                                                })}
                                            </div>
                                        </div>
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </>
                }
            </div>
        </section>
    );
}

export default Projects;
