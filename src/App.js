import React from 'react'
import Navb from './components/Navb'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Rezume from './pages/Rezume'
import Admin from './pages/Admin'
import ServicesSittings from './adminSittingPages/ServicesSittings'
import EducationSittings from './adminSittingPages/EducationSittings'
import SkillsSittings from './adminSittingPages/SkillsSittings'
import ProjectsSittings from './adminSittingPages/ProjectsStittings'
import ProjectsIControll from './adminSittingPages/insideControll/projectsIControll'
import ProjectDetails from './components/ProjectDetails'
import HeroImageSittings from './adminSittingPages/heroImageSittings'
import AboutUSittings from './adminSittingPages/AboutUSittings'



export default function App() {
  return (
    <div>
      <Navb />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='rezume' >
          <Route index element={<Rezume />} />
          <Route path=':projectID' element={<ProjectDetails />} />
        </Route>
        <Route path='admin'>
          <Route index element={<Admin />} />
          <Route path='hero-background' element={<HeroImageSittings />} />
          <Route path='about-u' element={<AboutUSittings />} />
          <Route path='services' element={<ServicesSittings />} />
          <Route path='education' element={<EducationSittings />} />
          <Route path='skills' element={<SkillsSittings />} />
          <Route path='projects'>
            <Route index element={<ProjectsSittings />} />
            <Route path=':projectID' element={<ProjectsIControll />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
