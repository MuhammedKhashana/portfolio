/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { Grid, Box } from '@radix-ui/themes'
import Card from 'react-bootstrap/Card';
import '../css/rezume.css'
import { useSelector, useDispatch } from 'react-redux'
import { callEduAPI } from '../RTK/slices/educationSlice';
import { callSkillsAPI } from '../RTK/slices/skillsSLice';
import { Fade, Slide } from 'react-awesome-reveal';


export default function EducationAndSkills() {
    const education = useSelector((state) => state.education)
    const skills = useSelector((state) => state.skills)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callEduAPI())
        dispatch(callSkillsAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div style={{ marginTop: "12vh" }}>
            <Container className='skills-edu-container d-flex flex-column justify-content-center'>
                <Fade>
                    <p className='my-3 text-white fs-3 fw-semibold text-center'>Education</p>
                </Fade>
                <Grid className='edu' columns={{ initial: '1' }} gap="3" width="auto">
                    <Slide cascade direction='left' duration={'300'}>
                        {
                            education.map((edu) => (
                                <Box key={edu.id}>
                                    <Card className='edu-card p-3 d-flex flex-column'>
                                        <Card.Body className='edu-card-txt d-flex flex-column'>
                                            <Card.Text className='d-flex flex-row align-items-center'>
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                                <Card.Text className='ms-2'>{edu.startDate} - {edu.endDate}</Card.Text>
                                            </Card.Text>
                                            <Card.Title>{edu.title}</Card.Title>
                                            <Card.Text>{edu.desc}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Box>
                            ))
                        }
                    </Slide>
                </Grid>
                <Fade direction='up'>
                    <p className='mt-5 mb-3 text-white fs-3 fw-semibold text-center'>Skills</p>
                </Fade>
                <Grid className='skills bg- rounded p-3' columns={{ initial: '2', md: "3" }} gap="6" width="auto">
                    <Fade cascade direction='right' duration={'300'}>
                        {
                            skills.map((skill) => (
                                <Box key={skill.id} className='skill-box'>
                                    <Card>
                                        <img src={skill.icon} style={{ padding: "12px" }} />
                                    </Card>
                                </Box>
                            ))
                        }
                    </Fade>
                </Grid>
            </Container>
        </div >
    )
}
