'use client'

import {useRouter} from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-lg">Page not found</p>
            <button
                className="mt-4"
                onClick={() => {router.push("/")}}
            >
                Вернуться назад
            </button>
        </div>
    )
}