// components/ImageWithLoader.tsx
'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import Spinner from "@/components/common/loading/Spinner";

interface ImageWithLoaderProps extends ImageProps {
    spinnerSize?: string;
    spinnerColor?: string;
}

export default function ImageWithLoader({
                                            alt,
                                            className = '',
                                            spinnerSize = "3rem",
                                            ...props
                                        }: ImageWithLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && (
                <Spinner size={spinnerSize} />
            )}
            <Image
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                onLoadingComplete={() => setIsLoading(false)}
                {...props}
            />
        </>
    );
}