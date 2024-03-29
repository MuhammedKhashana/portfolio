import { configureStore } from '@reduxjs/toolkit'
import servicesSlice from './slices/ServicesSlice'
import educationSlice from './slices/educationSlice'
import skillsSLice from './slices/skillsSLice'
import projectsSlice from './slices/projectsSlice'
import heroImageSlice from './slices/HeroImage'
import AboutUSlice from './slices/AboutUSlice'

export const store = configureStore({
    reducer: {
        services: servicesSlice,
        education: educationSlice,
        skills: skillsSLice,
        projects: projectsSlice,
        heroImage: heroImageSlice,
        aboutU: AboutUSlice
    },
})