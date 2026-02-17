'use client'

interface SpinnerProps {
    size?: string,
    absolute?: boolean
}

export default function Spinner({size, absolute}: SpinnerProps) {
    return (
        <div className={`${absolute ? 'absolute' : 'relative'} flex justify-center items-center h-full`}>
            <div
                className={`size-[${size || "3rem"}] border-4 border-(--main-color) border-t-transparent rounded-full animate-spin`}>
            </div>
        </div>
    )
}