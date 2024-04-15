import React, { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import { Popover, AspectRatio } from '@radix-ui/themes';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux'
import { Arrow90degLeft } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { callHeroImageAPI, editHeroImageAsync } from '../RTK/slices/HeroImage';
import { Fade, Zoom } from "react-awesome-reveal";



export default function HeroImageSittings() {
    const heroImg = useRef()

    const heroImgFrAPI = useSelector((state) => state.heroImage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callHeroImageAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ minHeight: "100vh", marginTop: "8vh" }}>
            {
                heroImgFrAPI.map((img) => (
                    <Container key={img.id} className='homeImg-setting-container d-flex flex-column justify-content-center'>
                        <Fade>
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <Link to={'/admin'}><Arrow90degLeft color="white" size={25} /></Link>
                                <p className='my-5 text-white fs-3 fw-bold text-start'>Home Page Background</p>
                                <Popover.Root>
                                    <Popover.Trigger>
                                        <PencilSquare color="white" size={25} />
                                    </Popover.Trigger>
                                    <Popover.Content size="1" style={{ minWidth: "72vw" }}>
                                        <FloatingLabel className='mb-2' controlId="floatingLink" label="home Background Link">
                                            <Form.Control defaultValue={heroImgFrAPI.imageLink} type="text" ref={heroImg} />
                                        </FloatingLabel>
                                        <Popover.Close>
                                            <button className='btn rounded bg-black text-white w-100' onClick={() =>
                                                (heroImg.current.value.trim() !== '') ?
                                                    dispatch(
                                                        editHeroImageAsync({
                                                            id: img.id,
                                                            imageLink: heroImg.current.value
                                                        })
                                                    )
                                                        .then(toast.success('Home Background Updated Successfully'))
                                                        .then(() => dispatch(callHeroImageAPI()))
                                                    : toast.error('Please Complete Your Data')
                                            }>
                                                Update
                                            </button>
                                        </Popover.Close>
                                    </Popover.Content>
                                </Popover.Root>
                            </div>
                        </Fade>
                        <Zoom direction='up' duration={'800'}>
                            <AspectRatio key={img.id} ratio={16 / 9.5}>
                                <img
                                    className='homeImg'
                                    src={img.imageLink}
                                    alt="A house in a forest"
                                    style={{
                                        filter: 'grayscale()',
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 'var(--radius-2)',
                                    }}
                                />
                            </AspectRatio>
                        </Zoom>
                    </Container>
                ))
            }
            <ToastContainer style={{ zIndex: "999999" }} />
        </div >
    )
}
