import React from 'react'
import Navb from '../components/Navb'
import EducationAndSkills from '../components/EducationAndSkills'
import Projects from '../components/projects'

export default function Rezume() {
    return (
        <div className='mb-5'>
            <Navb />
            <EducationAndSkills />
            <Projects />
        </div>
    )
}
