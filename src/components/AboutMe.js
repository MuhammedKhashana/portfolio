import React, { useEffect } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Grid, Box } from '@radix-ui/themes'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { callAboutUAPI } from '../RTK/slices/AboutUSlice';
import { Slide, Zoom } from "react-awesome-reveal";


export default function AboutMe() {
    const aboutUfAPI = useSelector((state) => state.aboutU)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callAboutUAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <Container className='aboutMeContainer my-5 d-flex flex-column justify-content-center'>
                {
                    aboutUfAPI.map((person) => (
                        <Grid key={person.id} columns={{ initial: "1", sm: "2" }} gap="9" width="auto">
                            <Zoom duration={'800'}>
                                <Box>
                                    <AspectRatio ratio={1 / 0.8}>
                                        <img
                                            className='homeImg h-100'
                                            src={person.personalImg}
                                            alt="A house in a forest"
                                            style={{
                                                filter: 'grayscale()',
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '80%',
                                                borderRadius: 'var(--radius-2)',
                                            }}
                                        />
                                    </AspectRatio>
                                </Box>
                            </Zoom>
                            <Slide direction='right' duration={'800'}>
                                <Box className='d-flex h-100 flex-column justify-content-between'>
                                    <div className='about-me-text'>
                                        <p className='text-white fs-2 fw-light'>
                                            About <span className='fw-bold'>Me</span>
                                        </p>
                                        <p className='text-white fs-5'>{person.aboutu}</p>
                                    </div>
                                    <div className='about-me-btns w-100 d-flex flex-row justify-content-between'>
                                        <Link className='btn fw-medium'>Hire Me</Link>
                                        <button className='btn fw-semibold'>Download CV</button>
                                    </div>
                                </Box>
                            </Slide>
                        </Grid>
                    ))
                }
            </Container>
        </div>
    )
}
