// components/ImageWithLoader.tsx
'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import Spinner, {SpinnerProps} from "@/components/common/loading/Spinner";

interface ImageWithLoaderProps extends ImageProps {
    spinnerProps?: SpinnerProps;
}

export default function ImageWithLoader({
    alt, className = '', spinnerProps , ...props
}: ImageWithLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && (
                <Spinner {...spinnerProps} />
            )}
            <Image
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                onLoad={() => setIsLoading(false)}
                {...props}
            />
        </>
    );
}