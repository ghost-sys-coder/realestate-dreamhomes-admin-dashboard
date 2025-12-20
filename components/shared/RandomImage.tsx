"use client";
import React, { useState } from 'react'
import Image from 'next/image';

const BACKGROUND_IMAGES = [
    "/assets/images/image-1.jpg",
    "/assets/images/image-2.jpg",
    "/assets/images/image-3.jpg",
    "/assets/images/image-4.jpg",
]

const RandomImage = () => {
    const [bgImage] = useState(() => {
        const randomIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
        return BACKGROUND_IMAGES[randomIndex];
    });




    return (
        <Image
            src={bgImage}
            alt='Premium real Estate in Uganda'
            fill
            className='object-cover'
            priority
        />
    )
}

export default RandomImage