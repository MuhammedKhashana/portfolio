import React from 'react'
import '../css/home.css'
import AboutMe from '../components/AboutMe'
import MyServices from '../components/MyServices'
import HeroSection from '../components/HeroSection'

export default function Home() {
    return (
        <div className='mb-5'>
            <HeroSection />
            <AboutMe />
            <MyServices />
        </div>
    )
}
