import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/navb.css'
import { Link } from 'react-router-dom';

export default function Navb() {
    const [background, setBackground] = useState({ background: 'transparent' });

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 200) {
                setBackground({ background: 'black' });
            } else {
                setBackground({ background: 'transparent' });
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div>
            <Navbar expand="lg" className="navb w-100" style={background}>
                <Container className='d-flex flex-col justify-content-center align-items-center'>
                    <Nav className="mx-auto w-100 d-flex flex-row justify-content-center align-items-center">
                        <Link className='nav-link mx-2 text-white' to={'/'}>HOME</Link>
                        <Link className='nav-link mx-2 text-white' to={'/rezume'}>RESUME</Link>
                        <Link className='nav-link mx-2 text-white' to={'/admin'}>PROFILE</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
