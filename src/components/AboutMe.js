import React, { useEffect } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Grid, Box, Text } from '@radix-ui/themes'
import Container from 'react-bootstrap/Container';
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
                        <Grid key={person.id} columns={{ initial: "1", md:"2"}} gap={{initial:"0", md:"8"}} width="auto">
                            <Zoom duration={'800'}>
                                <Box>
                                    <AspectRatio ratio={1 / 0.8}>
                                        <img
                                            className='homeImg'
                                            src={person.personalImg}
                                            alt="person_image"
                                            style={{
                                                filter: 'grayscale()',
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '90%',
                                                borderRadius: 'var(--radius-2)',
                                            }}
                                        />
                                    </AspectRatio>
                                </Box>
                            </Zoom>
                            <Slide direction='right' duration={'800'}>
                                <Box className='d-flex h-100 flex-column justify-content-between'>
                                    <div className='about-me-text d-flex flex-column justify-content-between'>
                                        <Text size={{ initial: "6", md: "8" }} className='mb-2 p-0 text-white fw-light'>
                                            About <Text className='fw-bold'>Me</Text>
                                        </Text>
                                        <Text size={{ initial: "3", md: "5" }} className='text-white fw-light opacity-80'>{person.aboutu}</Text>
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
