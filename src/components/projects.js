/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Grid } from '@radix-ui/themes'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { callProjectsAPI } from '../RTK/slices/projectsSlice';
import { ArrowBarRight } from 'react-bootstrap-icons'
import { Fade } from 'react-awesome-reveal';



export default function Projects() {
    const projects = useSelector((state) => state.projects)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callProjectsAPI())
    }, [])

    return (
        <div>
            <Container className='skills-edu-container d-flex flex-column justify-content-center'>
                <Fade>
                    <p className='mt-5 mb-3 text-white fs-3 fw-semibold text-center'>Projects</p>
                </Fade>
                <Grid columns={{ initial: '1', md: '2' }} gap="3" width="auto">
                    <Fade cascade direction='up' duration={'300'}>
                        {
                            projects && projects.map((project) => (
                                <Card key={project.id} className='p-2 d-flex flex-row justify-content-between'>
                                    <Card.Body>
                                        <Card.Title>{project.title}</Card.Title>
                                    </Card.Body>
                                    <div className='goto-icon d-flex align-items-center justify-content-center'>
                                        <Link className='d-flex justify-content-center' to={`/rezume/${project.id}`}>
                                            <ArrowBarRight color="royalblue" size={60} />
                                        </Link>
                                    </div>
                                </Card>
                            ))
                        }
                    </Fade>
                </Grid>
            </Container>
        </div>
    )
}
