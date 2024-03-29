import React, { useEffect } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Flex, Text } from '@radix-ui/themes'
import { useSelector, useDispatch } from 'react-redux'
import { callHeroImageAPI } from '../RTK/slices/HeroImage'
import { callAboutUAPI } from '../RTK/slices/AboutUSlice'
import { Fade } from "react-awesome-reveal";



export default function HeroSection() {
    const heroImageFrAPI = useSelector((state) => state.heroImage)
    const personalD = useSelector((state) => state.aboutU)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callHeroImageAPI())
        dispatch(callAboutUAPI())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className='heroSection'>
            {
                heroImageFrAPI && heroImageFrAPI.map((img) => (
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
                ))
            }
            <Flex direction="column" justify='between' align='center' className='heroTxt w-100 position-absolute'>
                <Fade duration={'1000'}>
                    <Text size={{ initial: "5", sm: "9" }} weight={{ initial: "light" }} className='text-white'>
                        Hello, I'm
                    </Text>
                    {
                        personalD.map((person) => (
                            <Text size={{ initial: "6", sm: "9" }} weight={{ initial: "bold" }} className='text-white'>{person.name}</Text>
                        ))
                    }
                    <Text size={{ initial: "1", sm: "5" }} className='text-white'>
                        AND THIS IS MY REZUME
                    </Text>
                </Fade>
            </Flex>
        </div>
    )
}
