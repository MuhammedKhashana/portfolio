import React, { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import { Popover, Grid, Text } from '@radix-ui/themes';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'
import '../css/sittingsStyle/servicesSitting.css'
import { PlusLg } from 'react-bootstrap-icons';
import { Arrow90degLeft } from 'react-bootstrap-icons';
import { ArrowBarRight } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { addProjectAsync, callProjectsAPI } from '../RTK/slices/projectsSlice';
import { Fade } from "react-awesome-reveal";



export default function ProjectsSittings() {
    const newTitle = useRef()
    const newDesc = useRef()
    const newImage = useRef()
    const newLink = useRef()

    const projects = useSelector((state) => state.projects)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callProjectsAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ minHeight: "100vh", marginTop: "8vh" }}>
            <Container className='projects-setting-container d-flex flex-column justify-content-center'>
                <Fade>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <Link to={'/admin'}><Arrow90degLeft color="white" size={25} /></Link>
                        <p className='my-5 text-white fs-3 fw-bold text-start'>PROJECTS</p>
                        <div className='controlls d-flex flex-column align-items-center'>
                            <Popover.Root>
                                <Popover.Trigger>
                                    <PlusLg color="royalblue" size={25} />
                                </Popover.Trigger>
                                <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                    <Form onSubmit={(e) => e.preventDefault()}>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Project Title">
                                            <Form.Control type="text" ref={newTitle} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Project Description">
                                            <Form.Control type="text" ref={newDesc} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Project Image Link">
                                            <Form.Control type="text" ref={newImage} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Project Link">
                                            <Form.Control type="text" ref={newLink} />
                                        </FloatingLabel>
                                        <Popover.Close>
                                            <button
                                                type='submit'
                                                className='btn rounded bg-black text-white w-100'
                                                onClick={() =>
                                                    (newTitle.current.value.trim() !== '' && newDesc.current.value.trim() !== '' && newImage.current.value.trim() !== '' && newLink.current.value.trim() !== '') ?
                                                        dispatch(
                                                            addProjectAsync({
                                                                title: newTitle.current.value,
                                                                desc: newDesc.current.value,
                                                                image: newImage.current.value,
                                                                link: newLink.current.value
                                                            }))
                                                            .then(() => {
                                                                toast.success('Your New Project Has Been Added Successfully')
                                                            })
                                                            .then(() => dispatch(callProjectsAPI()))
                                                        : toast.error('Please Complete Your Data')
                                                }>
                                                Add Project
                                            </button>
                                        </Popover.Close>
                                    </Form>
                                </Popover.Content>
                            </Popover.Root>
                        </div>
                    </div>
                </Fade>
                <Grid columns={{ initial: '1', md: "2" }} gap="3" width="auto">
                    <Fade direction='up' duration={'300'} cascade>
                        {
                            projects && projects.map((project) => (
                                <Card key={project.id} className='p-2 d-flex flex-row justify-content-between'>
                                    <Card.Body style={{ width: "85%" }}>
                                        <Text size={{ initial: "3", sm: "5" }}>{project.title}</Text>
                                    </Card.Body>
                                    <div className='goto-icon d-flex align-items-center justify-content-center' style={{ width: "15%" }}>
                                        <Link className='d-flex justify-content-end' to={`/admin/projects/${project.id}`}>
                                            <ArrowBarRight color="royalblue" size={60} />
                                        </Link>
                                    </div>
                                </Card>
                            ))
                        }
                    </Fade>
                </Grid>
            </Container>
            <ToastContainer style={{ zIndex: "999999" }} />
        </div >
    )
}
