/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { Flex, AspectRatio } from '@radix-ui/themes';
import { useSelector, useDispatch } from 'react-redux'
import { Arrow90degLeft } from 'react-bootstrap-icons';
import { callProjectsAPI } from '../RTK/slices/projectsSlice';
import { Fade, Zoom } from "react-awesome-reveal";



export default function ProjectsSittings() {
    let { projectID } = useParams()

    const projects = useSelector((state) => state.projects)
    const dispatch = useDispatch()
    const project = projects.filter(project => project.id === projectID)

    useEffect(() => {
        dispatch(callProjectsAPI())
    }, []);


    return (
        <div style={{ minHeight: "100vh", marginTop: "10vh" }}>
            <Container className='projects-setting-container d-flex flex-column justify-content-center'>
                <Fade>
                    <div className='d-flex flex-row justify-content-start align-items-center'>
                        <Link to={'/rezume'}><Arrow90degLeft color="white" size={25} /></Link>
                        <p className='my-5 ms-4 text-white fs-3 fw-bold text-start'>{project[0].title}</p>
                    </div>
                </Fade>
                <Flex gap="5" direction={'column'}>
                    <Zoom direction='up' duration={'500'}>
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
                    <Fade cascade direction='up' duration={'300'}>
                        <p className='fs-4 fw-semibold text-light'>{project[0].desc}</p>
                        <p className='fs-7 fw-meduim text-light'>
                            Project Link: <Link to={project[0].link} target='_blank'>{project[0].title}</Link>
                        </p>
                    </Fade>
                </Flex>
            </Container >
        </div >
    )
}
