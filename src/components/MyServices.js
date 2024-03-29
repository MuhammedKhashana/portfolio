import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { Grid, Box } from '@radix-ui/themes'
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'
import { callServicesAPI } from '../RTK/slices/ServicesSlice';
import { Fade } from "react-awesome-reveal";


export default function MyServices() {
    const services = useSelector((state) => state.services)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callServicesAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <Container className='my-service-container d-flex flex-column justify-content-center'>
                <Fade>
                    <p className='my-5 text-white fs-3 fw-light text-center'>MY <span className='fw-bold'>SERVICES</span></p>
                </Fade>
                <Grid columns={{ initial: '1', md: "2", lg: '3' }} gap="3" width="auto">
                    <Fade cascade direction='right'>
                        {
                            services.map((serv) => (
                                <Box key={serv.id}>
                                    <Card className='service-card p-3 d-flex flex-column align-items-center'>
                                        <Card.Img className='service-Img' variant="top" src={serv.icon} />
                                        <Card.Body className='service-card-txt text-center d-flex flex-column justify-content-center'>
                                            <Card.Title>{serv.title}</Card.Title>
                                            <Card.Text>{serv.desc}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Box>
                            ))
                        }
                    </Fade>
                </Grid>
            </Container>
        </div>
    )
}
