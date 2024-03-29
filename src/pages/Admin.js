import React, { useEffect } from 'react'
import { Grid, Text, Box, Avatar, Flex } from '@radix-ui/themes'
import Container from 'react-bootstrap/Container';
import '../css/admin.css'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import { callAboutUAPI } from '../RTK/slices/AboutUSlice';
import { Fade, Slide } from "react-awesome-reveal";



export default function Admin() {
    const personalD = useSelector((state) => state.aboutU)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callAboutUAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className='mb-5'>
            <Container style={{ paddingTop: "10vh" }}>
                <Fade>
                    <div className='admin-cart rounded pt-3 pb-5'>
                        {
                            personalD.map((person) => (
                                <Flex gap="4" align="center">
                                    <Avatar
                                        size={{ initial: "6", sm: "8" }}
                                        src={person.profileImg}
                                        fallback={person.name.split(" ")[0][0] + person.name.split(" ").slice(-1)[0][0]}
                                        radius="full"
                                        color="cyan"
                                    />
                                    <Box>
                                        <Text className='text-white' as="div" size={{ initial: "4", sm: "7" }} weight="bold">
                                            {person.name}
                                        </Text>
                                        <Text className='text-white-50' as="div" size={{ initial: "2", sm: "4" }} color="gray">
                                            {person.career}
                                        </Text>
                                    </Box>
                                </Flex>
                            ))
                        }
                    </div>
                </Fade>
                <Grid className='admin-sittings' columns={{ initial: '1', md: "2" }} gap="3" width="auto">
                    <Slide duration={'500'} direction='up'>
                        <Link className='nav-link d-flex flex-row justify-content-between align-items-center' to={'/admin/hero-background'}>
                            Hero Section
                            <ArrowRight color="black" size={25} />
                        </Link>
                    </Slide>
                    <Slide duration={'500'} direction='up'>
                        <Link className='nav-link d-flex flex-row justify-content-between align-items-center' to={'/admin/about-u'}>
                            About U
                            <ArrowRight color="black" size={25} />
                        </Link>
                    </Slide>
                    <Slide duration={'500'} direction='up' delay={'10'}>
                        <Link className='nav-link d-flex flex-row justify-content-between align-items-center' to={'/admin/services'}>
                            Services
                            <ArrowRight color="black" size={25} />
                        </Link>
                    </Slide>
                    <Slide duration={'500'} direction='up' delay={'10'}>
                        <Link className='nav-link d-flex flex-row justify-content-between align-items-center' to={'/admin/education'}>
                            Education
                            <ArrowRight color="black" size={25} />
                        </Link>
                    </Slide>
                    <Slide duration={'500'} direction='up' delay={'20'}>
                        <Link className='nav-link d-flex flex-row justify-content-between align-items-center' to={'/admin/skills'}>
                            Skills
                            <ArrowRight color="black" size={25} />
                        </Link>
                    </Slide>
                    <Slide duration={'500'} direction='up' delay={'20'}>
                        <Link className='nav-link d-flex flex-row justify-content-between align-items-center' to={'/admin/projects'}>
                            Projects
                            <ArrowRight color="black" size={25} />
                        </Link>
                    </Slide>
                </Grid>
            </Container>
        </div>
    )
}
