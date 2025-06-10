"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import BrokenImage from "@/public/svg/broken-cable.svg";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <div className="relative w-64 h-64 mb-8">
                <Image
                    src={BrokenImage}
                    alt="Error illustration"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <div className="flex items-center justify-center gap-2 mb-4 text-destructive">
                <AlertCircle className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Something went wrong!</h1>
            </div>

            <p className="max-w-md mb-8 text-muted-foreground">
                We apologize for the inconvenience. A critical error has occurred.
                {error.digest && (
                    <span className="block mt-2 text-xs">Error ID: {error.digest}</span>
                )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={reset}>Try again</button>
                <button>
                    <Link href="/">Return home</Link>
                </button>
            </div>
        </div>
    );
}
