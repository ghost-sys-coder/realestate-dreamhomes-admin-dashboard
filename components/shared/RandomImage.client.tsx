"use client";
import React from 'react'
import dynamic from 'next/dynamic';

const RandomImage = dynamic(() => import("./RandomImage"), { ssr: false });

const RandomImageClient = () => {
    return <RandomImage />;
}

export default RandomImageClient