import React, { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import { Popover, AspectRatio, Grid, Box, Flex, Avatar, Text } from '@radix-ui/themes';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux'
import { Arrow90degLeft } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { callAboutUAPI, editAboutUAsync } from '../RTK/slices/AboutUSlice';
import { Fade, Zoom } from "react-awesome-reveal";



export default function HeroImageSittings() {
    const AName = useRef()
    const career = useRef()
    const personalImg = useRef()
    const profileImg = useRef()
    const aboutU = useRef()

    const aboutUfAPI = useSelector((state) => state.aboutU)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callAboutUAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ minHeight: "100vh", marginTop: "8vh" }}>
            {
                aboutUfAPI.map((person) => (
                    <Container key={person.id} className='aboutU-setting-container d-flex flex-column justify-content-center'>
                        <Fade>
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <Link to={'/admin'}><Arrow90degLeft color="white" size={25} /></Link>
                                <p className='my-5 text-white fs-3 fw-bold text-start'>Personal Date</p>
                                <Popover.Root>
                                    <Popover.Trigger>
                                        <PencilSquare color="white" size={25} />
                                    </Popover.Trigger>
                                    <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                        <FloatingLabel className='mb-2' controlId="floatingName" label="Name">
                                            <Form.Control defaultValue={person.name} type="text" ref={AName} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingCareer" label="Career">
                                            <Form.Control defaultValue={person.career} type="text" ref={career} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingAboutU" label="About U">
                                            <Form.Control defaultValue={person.aboutu} type="text" ref={aboutU} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingPersonalImg" label="Your Image Link">
                                            <Form.Control defaultValue={person.personalImg} type="text" ref={personalImg} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingProfileImg" label="Profile Image Link (Optional)">
                                            <Form.Control defaultValue={person.profileImg} type="text" ref={profileImg} />
                                        </FloatingLabel>
                                        <Popover.Close>
                                            <button className='btn rounded bg-black text-white w-100' onClick={() =>
                                                (aboutU.current.value.trim() !== '' && personalImg.current.value.trim() !== '' && AName.current.value.trim() !== '' && career.current.value.trim() !== '') ?
                                                    dispatch(
                                                        editAboutUAsync({
                                                            id: person.id,
                                                            name: AName.current.value,
                                                            career: career.current.value,
                                                            aboutu: aboutU.current.value,
                                                            personalImg: personalImg.current.value,
                                                            profileImg: profileImg.current.value
                                                        })
                                                    )
                                                        .then(toast.success('Your Data Updated Successfully'))
                                                        .then(() => dispatch(callAboutUAPI()))
                                                    : toast.error('Please Complete Your Data')
                                            }>
                                                Update
                                            </button>
                                        </Popover.Close>
                                    </Popover.Content>
                                </Popover.Root>
                            </div>
                        </Fade>
                        <Fade direction='left'>
                            <div className='admin-cart rounded pb-5'>
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
                            </div>
                        </Fade>
                        <Grid columns={{ initial: "1", sm: "2" }} gap={{ initial: "5", sm: "8" }} width="auto">
                            <Zoom>
                                <Box>
                                    <AspectRatio ratio={1 / 0.8}>
                                        <img
                                            className='homeImg h-100'
                                            src={person.personalImg}
                                            alt="person_Image"
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
                            <Fade direction='right'>
                                <Box className='d-flex flex-column justify-content-between'>
                                    <div className='about-me-text'>
                                        <p className='text-white fs-1 fw-light'>
                                            About <span className='fw-bold'>Me</span>
                                        </p>
                                        <p className='text-white fs-5'>{person.aboutu}</p>
                                    </div>
                                </Box>
                            </Fade>
                        </Grid>
                    </Container>
                ))
            }
            <ToastContainer style={{ zIndex: "999999" }} />
        </div >
    )
}
