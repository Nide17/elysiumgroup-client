import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, Typography, Progress, Spinner } from '@material-tailwind/react'
import { addProjectImages, getOneProject, deleteProjectImage } from '@/redux/slices/projectsSlice' // Assume deleteProjectImage is the action to delete image
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

export function ImagesUploader() {
    const dispatch = useDispatch()
    const { projectID } = useParams()
    const [images, setImages] = useState([])
    const [previewUrls, setPreviewUrls] = useState([])
    const [uploading, setUploading] = useState(false)
    const { project } = useSelector(state => state.projects)

    useEffect(() => {
        if (projectID) {
            dispatch(getOneProject(projectID))
        }
    }, [dispatch, projectID])

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        setImages(files)

        const urls = files.map(file => URL.createObjectURL(file))
        setPreviewUrls(urls)
    }

    const handleUpload = async () => {
        setUploading(true)

        const formData = new FormData()
        images.forEach(image => {
            formData.append('pGallery', image)
        })

        try {
            if (formData.getAll('pGallery').length === 0) {
                toast.error('Please select images to upload')
                setUploading(false)
                return
            }

            const response = dispatch(addProjectImages({ formData, projectID }))
            response.then((res) => {
                if (res.payload) {
                    setUploading(false)
                    setImages([])
                    setPreviewUrls([])
                }
            })

            document.getElementById('file-upload').value = ''
        } catch (error) {
            toast.error('Failed to upload images')
            setUploading(false)
        }
    }

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index))
        setPreviewUrls(previewUrls.filter((_, i) => i !== index))
    }

    const handleDeleteExistingImage = async (imageID) => {
        try {
            dispatch(deleteProjectImage({ projectID, imageID }))
        } catch (error) {
            toast.error('Failed to delete image')
        }
    }

    return (
        <Card className="p-4 w-full mx-auto">
            <CardBody>
                <Typography variant="h5" className="mb-4">
                    Upload Images to the "{project && project.pName.split('')[0].toUpperCase() + project.pName.slice(1)}" Project
                </Typography>

                <div className="relative">
                    <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} name='pGallery'
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                        file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>

                <div className="previews mt-4 flex flex-wrap gap-2">
                    {previewUrls.map((url, index) => (
                        <div key={index} className="relative">
                            <img src={url} alt="Preview" className="w-auto h-32 object-cover rounded-lg shadow" />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded px-1.5 py-0.5 text-xs">x</button>
                        </div>
                    ))}
                </div>

                <Button color="blue" onClick={handleUpload} disabled={uploading} className="mt-4">
                    {uploading ? 'Uploading...' : 'Upload Images'}
                </Button>

                {uploading && <Progress value={uploading ? 100 : 0} className="mt-4" />}
                {uploading && <Spinner color="blue" />}

                {project && project.pGallery.length > 0 && (
                    <div className="mt-4">
                        <Typography variant="h6" color="blue-gray">Existing Images</Typography>
                        <div className="previews mt-4 flex flex-wrap gap-2">
                            {project.pGallery.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={image.url} alt="Preview" className="w-auto h-32 object-cover rounded-lg shadow" />
                                    <button
                                        onClick={() => handleDeleteExistingImage(image._id)}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded px-1.5 py-0.5 text-xs">x</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    )
}

export default ImagesUploader
