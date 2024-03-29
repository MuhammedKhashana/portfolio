/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { Popover, Flex, AspectRatio, Text } from '@radix-ui/themes';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux'
import '../../css/sittingsStyle/servicesSitting.css'
import { PencilSquare } from 'react-bootstrap-icons';
import { Arrow90degLeft } from 'react-bootstrap-icons';
import { Trash3 } from 'react-bootstrap-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { callProjectsAPI, deleteProjectAsync, editProjectAsync } from '../../RTK/slices/projectsSlice';
import { Fade, Zoom } from "react-awesome-reveal";



export default function ProjectsSittings() {
    const navigate = useNavigate()
    let { projectID } = useParams()

    const title = useRef()
    const desc = useRef()
    const image = useRef()
    const link = useRef()

    const projects = useSelector((state) => state.projects)
    const dispatch = useDispatch()
    const project = projects.filter(project => project.id === projectID)

    useEffect(() => {
        dispatch(callProjectsAPI())
    }, []);

    const submitX = () => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: `You are going to delete ${project[0].title} Project`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        dispatch(deleteProjectAsync(projectID))
                            .then(navigate('/admin/projects'))
                },
                {
                    label: 'No',
                }
            ]
        })
    };

    return (
        <div style={{ minHeight: "100vh", marginTop: "10vh" }}>
            <Container className='projects-setting-container d-flex flex-column justify-content-center'>
                <Fade>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <Link to={'/admin/projects'}><Arrow90degLeft color="white" size={25} /></Link>
                        <Text size={{ initial: "4", sm: "8" }} className='my-5 mx-2 text-center text-white fw-bold text-start'>{project[0].title}</Text>
                        <div className='controlls d-flex flex-row align-items-center'>
                            <Popover.Root>
                                <Popover.Trigger>
                                    <PencilSquare color="royalblue" size={20} />
                                </Popover.Trigger>
                                <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                    <Form onSubmit={(e) => e.preventDefault()}>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Project Title">
                                            <Form.Control defaultValue={project[0].title} type="text" ref={title} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Project Description">
                                            <Form.Control defaultValue={project[0].desc} type="text" ref={desc} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Project Image Link">
                                            <Form.Control defaultValue={project[0].image} type="text" ref={image} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Project Link">
                                            <Form.Control defaultValue={project[0].link} type="text" ref={link} />
                                        </FloatingLabel>
                                        <Popover.Close>
                                            <button
                                                type='submit'
                                                className='btn rounded bg-black text-white w-100'
                                                onClick={() =>
                                                    (title.current.value.trim() !== '' && desc.current.value.trim() !== '' && image.current.value.trim() !== '' && link.current.value.trim() !== '') ?
                                                        dispatch(
                                                            editProjectAsync({
                                                                id: projectID,
                                                                title: title.current.value,
                                                                desc: desc.current.value,
                                                                image: image.current.value,
                                                                link: link.current.value
                                                            }))
                                                            .then(() => {
                                                                toast.success('Your Project Data Updated Successfully')
                                                            })
                                                            .then(() => dispatch(callProjectsAPI()))
                                                        : toast.error('Please Complete Your Data')
                                                }>
                                                Update
                                            </button>
                                        </Popover.Close>
                                    </Form>
                                </Popover.Content>
                            </Popover.Root>
                            <button className='btn' onClick={() => submitX()}>
                                <Trash3 color="royalblue" size={18} />
                            </button>
                        </div>
                    </div>
                </Fade>
                <Flex gap="5" direction={'column'}>
                    <Zoom>
                        <AspectRatio ratio={16 / 6}>
                            <img
                                src={project[0].image}
                                alt="Project Image"
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 'var(--radius-2)',
                                }}
                            />
                        </AspectRatio>
                    </Zoom>
                    <Fade direction='up' duration={'500'} cascade>
                        <p className='fs-4 fw-semibold text-light'>{project[0].desc}</p>
                        <p className='fs-7 fw-meduim text-light'>
                            Project Link: <Link to={project[0].link} target='_blank'>{project[0].title}</Link>
                        </p>
                    </Fade>
                </Flex>
            </Container >
            <ToastContainer style={{ zIndex: "999999" }} />
        </div >
    )
}
