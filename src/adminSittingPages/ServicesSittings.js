import React, { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import { Popover, Grid, Box } from '@radix-ui/themes';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'
import { addServiceAsync, callServicesAPI, deleteServiceAsync, editServiceAsync } from '../RTK/slices/ServicesSlice';
import '../css/sittingsStyle/servicesSitting.css'
import { PlusLg } from 'react-bootstrap-icons';
import { Arrow90degLeft } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";



export default function ServicesSittings() {
    const title = useRef(null)
    const desc = useRef(null)
    const icon = useRef(null)
    const newTitle = useRef(null)
    const newDesc = useRef(null)
    const newIcon = useRef(null)

    const services = useSelector((state) => state.services)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callServicesAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ minHeight: "100vh", marginTop: "8vh" }}>
            <Container className='service-setting-container d-flex flex-column justify-content-center'>
                <Fade>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <Link to={'/admin'}><Arrow90degLeft color="white" size={25} /></Link>
                        <p className='my-5 text-white fs-3 fw-bold text-start'>SERVICES</p>
                        <div className='controlls d-flex flex-column align-items-center'>
                            <Popover.Root>
                                <Popover.Trigger>
                                    <PlusLg color="royalblue" size={25} />
                                </Popover.Trigger>
                                <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                    <Form onSubmit={(e) => e.preventDefault()}>
                                        <FloatingLabel className='mb-2' controlId="floatingTitle" label="Title">
                                            <Form.Control required type="text" ref={newTitle} />
                                        </FloatingLabel>
                                        <FloatingLabel required className='mb-2' controlId="floatingDesc" label="Description">
                                            <Form.Control type="text" ref={newDesc} />
                                        </FloatingLabel>
                                        <FloatingLabel required className='mb-2' controlId="floatingIcon" label="Icon Link">
                                            <Form.Control type="text" ref={newIcon} />
                                        </FloatingLabel>
                                        <Popover.Close>
                                            <button
                                                type='submit'
                                                className='btn rounded bg-black text-white w-100'
                                                onClick={() =>
                                                    (newTitle.current.value.trim() !== '' && newDesc.current.value.trim() !== '' && newIcon.current.value.trim() !== '') ?
                                                        dispatch(
                                                            addServiceAsync({
                                                                title: newTitle.current.value,
                                                                desc: newDesc.current.value,
                                                                icon: newIcon.current.value
                                                            }))
                                                            .then(() => {
                                                                toast.success('Your New Service Has Been Addes Sucssefly')
                                                            })
                                                            .then(() => dispatch(callServicesAPI()))
                                                        : toast.error('Please Complete Your Data')
                                                }>
                                                Add Service
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
                            services.map((serv) => (
                                <Box key={serv.id}>
                                    <Card className='service-setting-card rounded p-3 d-flex flex-column flex-sm-row align-items-center'>
                                        <Card.Img className='service-setting-Img' variant="top" src={serv.icon} style={{ aspectRatio: "3/4" }} />
                                        <Card.Body className='service-setting-card-txt d-flex flex-column justify-content-center'>
                                            <Card.Title>{serv.title}</Card.Title>
                                            <Card.Text>{serv.desc}</Card.Text>
                                        </Card.Body>
                                        <div className='controlls d-flex flex-row flex-sm-column align-items-center'>
                                            <Popover.Root>
                                                <Popover.Trigger>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                    </svg>
                                                </Popover.Trigger>
                                                <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                                    <FloatingLabel className='mb-2' controlId="floatingTitle" label="Title">
                                                        <Form.Control type="text" defaultValue={serv.title} ref={title} />
                                                    </FloatingLabel>
                                                    <FloatingLabel className='mb-2' controlId="floatingDesc" label="Description">
                                                        <Form.Control type="text" defaultValue={serv.desc} ref={desc} />
                                                    </FloatingLabel>
                                                    <FloatingLabel className='mb-2' controlId="floatingIcon" label="Icon Link">
                                                        <Form.Control type="text" defaultValue={serv.icon} ref={icon} />
                                                    </FloatingLabel>
                                                    <Popover.Close>
                                                        <button className='btn rounded bg-black text-white w-100' onClick={() =>
                                                            (title.current.value.trim() !== '' && desc.current.value.trim() !== '' && icon.current.value.trim() !== '') ?
                                                                dispatch(
                                                                    editServiceAsync({
                                                                        id: serv.id,
                                                                        title: title.current.value,
                                                                        desc: desc.current.value,
                                                                        icon: icon.current.value
                                                                    })
                                                                )
                                                                    .then(toast.success('Your Service Updated Sucssefly'))
                                                                    .then(() => dispatch(callServicesAPI()))
                                                                : toast.error('Please Complete Your Data')
                                                        }>
                                                            Update Data
                                                        </button>
                                                    </Popover.Close>
                                                </Popover.Content>
                                            </Popover.Root>
                                            <button className='btn' onClick={() => dispatch(deleteServiceAsync(serv.id)).then(toast.info('You Have Deleted Service'))}>
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
