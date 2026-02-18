'use client'

export interface SpinnerProps {
    size?: string,
    absolute?: boolean,
    className?: string
}

export default function Spinner({size, absolute, className}: SpinnerProps) {
    return (
        <div className={`${absolute ? 'absolute' : 'relative'} ${className} flex justify-center items-center h-full w-auto`}>
            <div
                className={`${size ? "size-["+size+"]" : "size-10"} border-4 border-(--main-color) border-t-transparent rounded-full animate-spin`}>
            </div>
        </div>
    )
}