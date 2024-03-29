import React, { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import { Popover, Grid, Box } from '@radix-ui/themes';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'
import '../css/sittingsStyle/servicesSitting.css'
import { PlusLg } from 'react-bootstrap-icons';
import { Arrow90degLeft } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { addSkillAsync, callSkillsAPI, deleteSkillAsync, editSkillAsync } from '../RTK/slices/skillsSLice';
import { Fade } from "react-awesome-reveal";




export default function EducationSittings() {
    const icon = useRef()
    const newIcon = useRef()

    const skills = useSelector((state) => state.skills)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callSkillsAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ minHeight: "100vh", marginTop: "8vh" }}>
            <Container className='skills-setting-container d-flex flex-column justify-content-center'>
                <Fade>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <Link to={'/admin'}><Arrow90degLeft color="white" size={25} /></Link>
                        <p className='my-5 text-white fs-3 fw-bold text-start'>SKILLS</p>
                        <div className='controlls d-flex flex-column align-items-center'>
                            <Popover.Root>
                                <Popover.Trigger>
                                    <PlusLg color="royalblue" size={25} />
                                </Popover.Trigger>
                                <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                    <Form onSubmit={(e) => e.preventDefault()}>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Skill Icon Link">
                                            <Form.Control type="text" ref={newIcon} />
                                        </FloatingLabel>
                                        <Popover.Close>
                                            <button
                                                type='submit'
                                                className='btn rounded bg-black text-white w-100'
                                                onClick={() =>
                                                    (newIcon.current.value.trim() !== '') ?
                                                        dispatch(
                                                            addSkillAsync({
                                                                icon: newIcon.current.value
                                                            }))
                                                            .then(() => {
                                                                toast.success('Your New Skill Has Been Addes Successfully')
                                                            })
                                                            .then(() => dispatch(callSkillsAPI()))
                                                        : toast.error('Please Complete Your Data')
                                                }>
                                                Add Skill
                                            </button>
                                        </Popover.Close>
                                    </Form>
                                </Popover.Content>
                            </Popover.Root>
                        </div>
                    </div>
                </Fade>
                <Grid columns={{ initial: '2', md: "4", sm: "3" }} gap="3" width="auto">
                    <Fade direction='right' duration={'300'} cascade>
                        {
                            skills.map((skill) => (
                                <Box key={skill.id} className='skill-box'>
                                    <Card>
                                        <img src={skill.icon} alt='skill icon' style={{ padding: "22px" }} />
                                        <div className='controlls d-flex flex-row justify-content-center align-items-center'>
                                            <Popover.Root>
                                                <Popover.Trigger>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                    </svg>
                                                </Popover.Trigger>
                                                <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                                    <FloatingLabel className='mb-2' controlId="floatingTitle" label="Skill Icon Link">
                                                        <Form.Control defaultValue={skill.icon} type="text" ref={icon} />
                                                    </FloatingLabel>
                                                    <Popover.Close>
                                                        <button className='btn rounded bg-black text-white w-100' onClick={() =>
                                                            (icon.current.value.trim() !== '') ?
                                                                dispatch(
                                                                    editSkillAsync({
                                                                        id: skill.id,
                                                                        icon: icon.current.value
                                                                    })
                                                                )
                                                                    .then(toast.success('Your Skill Updated Successfully'))
                                                                    .then(() => dispatch(callSkillsAPI()))
                                                                : toast.error('Please Complete Your Data')
                                                        }>
                                                            Update Data
                                                        </button>
                                                    </Popover.Close>
                                                </Popover.Content>
                                            </Popover.Root>
                                            <button className='btn' onClick={() => dispatch(deleteSkillAsync(skill.id)).then(toast.info('You Have Deleted Skill'))}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </Card>
                                </Box>
                            ))
                        }
                    </Fade>
                </Grid>
            </Container>
            <ToastContainer style={{ zIndex: "999999" }} />
        </div >
    )
}
