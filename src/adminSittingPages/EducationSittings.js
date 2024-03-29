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
import { addEduAsync, callEduAPI, deleteEduAsync, editEduAsync } from '../RTK/slices/educationSlice';
import { Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";




export default function EducationSittings() {
    const startDate = useRef()
    const endDate = useRef()
    const title = useRef(null)
    const desc = useRef(null)
    const newStartDate = useRef()
    const NewEndDate = useRef()
    const newTitle = useRef(null)
    const newDesc = useRef(null)

    const Edus = useSelector((state) => state.education)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callEduAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ minHeight: "100vh", marginTop: "8vh" }}>
            <Container className='edus-setting-container d-flex flex-column justify-content-center'>
                <Fade>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <Link to={'/admin'}><Arrow90degLeft color="white" size={25} /></Link>
                        <p className='my-5 text-white fs-3 fw-bold text-start'>EDUCATION</p>
                        <div className='controlls d-flex flex-column align-items-center'>
                            <Popover.Root>
                                <Popover.Trigger>
                                    <PlusLg color="royalblue" size={25} />
                                </Popover.Trigger>
                                <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                    <Form onSubmit={(e) => e.preventDefault()}>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Start Date">
                                            <Form.Control type="date" ref={newStartDate} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingDesc" label="End Date (Expected date of graduation)">
                                            <Form.Control type="date" ref={NewEndDate} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingIcon" label="Title">
                                            <Form.Control type="text" ref={newTitle} />
                                        </FloatingLabel>
                                        <FloatingLabel className='mb-2' controlId="floatingIcon" label="Description">
                                            <Form.Control type="text" ref={newDesc} />
                                        </FloatingLabel>
                                        <Popover.Close>
                                            <button
                                                type='submit'
                                                className='btn rounded bg-black text-white w-100'
                                                onClick={() =>
                                                    (newStartDate.current.value.trim() !== '' && NewEndDate.current.value.trim() !== '' && newTitle.current.value.trim() !== '' && newDesc.current.value.trim() !== '') ?
                                                        dispatch(
                                                            addEduAsync({
                                                                startDate: newStartDate.current.value,
                                                                endDate: NewEndDate.current.value,
                                                                title: newTitle.current.value,
                                                                desc: newDesc.current.value
                                                            }))
                                                            .then(() => {
                                                                toast.success('Your New Education Has Been Addes Successfully')
                                                            })
                                                            .then(() => dispatch(callEduAPI()))
                                                        : toast.error('Please Complete Your Data')
                                                }>
                                                Add Education
                                            </button>
                                        </Popover.Close>
                                    </Form>
                                </Popover.Content>
                            </Popover.Root>
                        </div>
                    </div>
                </Fade>
                <Grid columns={{ initial: '1' }} gap="3" width="auto">
                    <Fade direction='up' duration={'300'} cascade>
                        {
                            Edus.map((edu) => (
                                <Box key={edu.id}>
                                    <Card className='edu-card p-3 d-flex flex-row align-items-center justify-content-between'>
                                        <Card.Body className='edu-card-txt d-flex flex-column'>
                                            <Card.Text className='d-flex flex-row align-items-center'>
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                                <Card.Text className='ms-2'>{edu.startDate} - {edu.endDate}</Card.Text>
                                            </Card.Text>
                                            <Card.Title>{edu.title}</Card.Title>
                                            <Card.Text>{edu.desc}</Card.Text>
                                        </Card.Body>
                                        <div className='controlls d-flex flex-column align-items-center'>
                                            <Popover.Root>
                                                <Popover.Trigger>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                    </svg>
                                                </Popover.Trigger>
                                                <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                                    <FloatingLabel className='mb-2' controlId="floatingTitle" label="Start Date">
                                                        <Form.Control defaultValue={edu.startDate} type="date" ref={startDate} />
                                                    </FloatingLabel>
                                                    <FloatingLabel className='mb-2' controlId="floatingDesc" label="End Date (Expected date of graduation)">
                                                        <Form.Control defaultValue={edu.endDate} type="date" ref={endDate} />
                                                    </FloatingLabel>
                                                    <FloatingLabel className='mb-2' controlId="floatingIcon" label="Title">
                                                        <Form.Control defaultValue={edu.title} type="text" ref={title} />
                                                    </FloatingLabel>
                                                    <FloatingLabel className='mb-2' controlId="floatingIcon" label="Description">
                                                        <Form.Control defaultValue={edu.desc} type="text" ref={desc} />
                                                    </FloatingLabel>
                                                    <Popover.Close>
                                                        <button className='btn rounded bg-black text-white w-100' onClick={() =>
                                                            (startDate.current.value.trim() !== '' && endDate.current.value.trim() !== '' && title.current.value.trim() !== '' && desc.current.value.trim() !== '') ?
                                                                dispatch(
                                                                    editEduAsync({
                                                                        id: edu.id,
                                                                        startDate: startDate.current.value,
                                                                        endDate: endDate.current.value,
                                                                        title: title.current.value,
                                                                        desc: desc.current.value
                                                                    })
                                                                )
                                                                    .then(toast.success('Your Education Updated Successfully'))
                                                                    .then(() => dispatch(callEduAPI()))
                                                                : toast.error('Please Complete Your Data')
                                                        }>
                                                            Update Data
                                                        </button>
                                                    </Popover.Close>
                                                </Popover.Content>
                                            </Popover.Root>
                                            <button className='btn' onClick={() => dispatch(deleteEduAsync(edu.id)).then(toast.info('You Have Deleted Education'))}>
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
